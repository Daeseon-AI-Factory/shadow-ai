// In-memory auth state. The core API client reads the token synchronously via
// setTokenProvider(), but SecureStore is async — so we hold the token in memory here
// (hydrated once at startup) and mirror writes to SecureStore.
import { create } from 'zustand';
import { clearToken, saveToken } from './secure-token';
import { queryClient } from './query-client';

interface AuthState {
  token: string | null;
  /** False until SecureStore has been read once at startup (avoids a redirect flash). */
  hydrated: boolean;
  /** Makes a stored token available to the API client without exposing authenticated routes yet. */
  stageToken: (token: string) => void;
  hydrate: (token: string | null) => void;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  hydrated: false,
  stageToken: (token) => set({ token, hydrated: false }),
  hydrate: (token) => set({ token, hydrated: true }),
  signIn: async (token) => {
    await saveToken(token);
    set({ token });
  },
  signOut: async () => {
    // Clear live state first: a locked/unavailable keychain must not keep authenticated screens
    // mounted or leave the previous user's cached server data visible.
    set({ token: null });
    queryClient.clear();
    // Keep persistence failures observable to callers; live auth state and user-scoped cache have
    // already been cleared above.
    await clearToken();
  },
}));
