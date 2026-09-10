import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, fetchMe } from '@/lib/auth';

const STORAGE_KEY = 'kge-hq-token';

/* ═══════════════════════════════════════════════
   CONTEXT — admin auth state for the /hq section
═══════════════════════════════════════════════ */
const AuthContext = createContext(null);

/**
 * useAuth — access { user, loading, login, logout } anywhere in the tree.
 */
export function useAuth() {
  return useContext(AuthContext);
}

function readStoredToken() {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredToken(token) {
  try {
    if (token) sessionStorage.setItem(STORAGE_KEY, token);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // private browsing / storage unavailable — session just won't persist
  }
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  // Starts true so RequireAuth doesn't redirect to /hq/login before a
  // stored token has had a chance to be validated on first load.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = readStoredToken();
    if (!stored) {
      setLoading(false);
      return;
    }
    fetchMe(stored)
      .then((me) => {
        setToken(stored);
        setUser(me);
      })
      .catch(() => {
        writeStoredToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { token: newToken, user: newUser } = await apiLogin(email, password);
    writeStoredToken(newToken);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    writeStoredToken(null);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
