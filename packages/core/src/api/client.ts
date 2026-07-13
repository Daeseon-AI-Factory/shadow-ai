// Web (Next.js) inlines NEXT_PUBLIC_API_URL at build time. Mobile (Expo) has no such var,
// so it calls configureApiBaseUrl() in its bootstrap. Either way the client stays platform-agnostic.
let baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/** Override the API base URL at runtime (used by the mobile client; web sets it via env). */
export function configureApiBaseUrl(url: string) {
  baseUrl = url;
}

export interface ApiEnvelope<T> {
  data: T | null;
  error: { code: string; message: string } | null;
  timestamp: string;
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

let tokenProvider: (() => string | null) | null = null;

export function setTokenProvider(provider: () => string | null) {
  tokenProvider = provider;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any> | unknown[] | FormData | undefined;

export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Body;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 15_000;
const UPLOAD_TIMEOUT_MS = 60_000;

function buildUrl(path: string, query?: FetchOptions["query"]) {
  const url = new URL(path.startsWith("http") ? path : `${baseUrl}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function apiRequest<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, query, signal } = options;
  const timeoutMs = options.timeoutMs ?? (body instanceof FormData ? UPLOAD_TIMEOUT_MS : DEFAULT_TIMEOUT_MS);

  const headers: Record<string, string> = {};
  const token = tokenProvider?.();
  if (token) headers.Authorization = `Bearer ${token}`;

  let serialized: BodyInit | undefined;
  if (body instanceof FormData) {
    serialized = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    serialized = JSON.stringify(body);
  }

  const controller = new AbortController();
  let timedOut = false;
  const forwardCallerAbort = () => controller.abort();

  if (signal?.aborted) {
    forwardCallerAbort();
  } else {
    signal?.addEventListener("abort", forwardCallerAbort, { once: true });
  }

  const timeout = setTimeout(() => {
    // A caller abort wins a same-tick race; only our timer maps the failure to TIMEOUT.
    if (!controller.signal.aborted) {
      timedOut = true;
      controller.abort();
    }
  }, timeoutMs);

  try {
    const response = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: serialized,
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await response.text();
    const payload = text ? (JSON.parse(text) as ApiEnvelope<T>) : ({ data: null, error: null, timestamp: "" } as ApiEnvelope<T>);

    if (!response.ok || payload.error) {
      const error = payload.error ?? { code: "HTTP_ERROR", message: response.statusText };
      throw new ApiError(response.status, error.code, error.message);
    }

    return payload.data as T;
  } catch (error) {
    if (timedOut) {
      throw new ApiError(408, "TIMEOUT", "Request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", forwardCallerAbort);
  }
}

export const apiClient = {
  get: <T>(path: string, opts?: Omit<FetchOptions, "method" | "body">) => apiRequest<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: Body, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "POST", body }),
  put: <T>(path: string, body?: Body, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "PUT", body }),
  patch: <T>(path: string, body?: Body, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "PATCH", body }),
  delete: <T>(path: string, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "DELETE" }),
};
