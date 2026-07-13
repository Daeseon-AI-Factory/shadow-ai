import { ApiError } from '@shadow-ai/core';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

// The 401 handler needs signOut + navigation, which live elsewhere. To avoid an import cycle
// (auth-store imports this module to clear the cache on sign-out), the handler is registered
// from the root layout instead of imported here.
let onUnauthorized: (() => void | Promise<void>) | null = null;
let handlingUnauthorized = false;

export function setUnauthorizedHandler(fn: () => void | Promise<void>) {
  onUnauthorized = fn;
}

function handleError(error: unknown) {
  // A revoked (token_version bump) or expired JWT returns 401. Without this, the stored token
  // stays non-null and every screen shows "Authentication required" forever. Route to login.
  if (error instanceof ApiError && error.status === 401 && !handlingUnauthorized) {
    handlingUnauthorized = true;
    void Promise.resolve()
      .then(() => onUnauthorized?.())
      .catch(() => undefined)
      .finally(() => {
        handlingUnauthorized = false;
      });
  }
}

function shouldRetryQuery(failureCount: number, error: unknown) {
  // Retrying an expired/revoked token only delays the centralized sign-out. Preserve TanStack's
  // client default of three retries for transient non-auth failures.
  return !(error instanceof ApiError && error.status === 401) && failureCount < 3;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
  defaultOptions: {
    queries: { retry: shouldRetryQuery },
  },
});
