import { createContext, useContext, useState, useCallback } from "react";

// ── Mock credentials ──────────────────────────────────────────────────────────
const MOCK_USER = {
  email: "test@test.com",
  password: "123456",
  name: "Site Engineer",
  role: "Field Manager",
  avatar: "SE",
};

// ── Context creation ──────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persist login across page refreshes via sessionStorage
    try {
      const stored = sessionStorage.getItem("gsf_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  /**
   * Simulate async login against mock credentials.
   * Returns { success, error }
   */
  const login = useCallback(async ({ email, password }) => {
    // Simulate network latency
    await new Promise((res) => setTimeout(res, 1200));

    if (
      email.trim().toLowerCase() === MOCK_USER.email &&
      password === MOCK_USER.password
    ) {
      const loggedInUser = {
        email: MOCK_USER.email,
        name: MOCK_USER.name,
        role: MOCK_USER.role,
        avatar: MOCK_USER.avatar,
      };
      setUser(loggedInUser);
      sessionStorage.setItem("gsf_user", JSON.stringify(loggedInUser));
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid email or password. Please try again.",
    };
  }, []);

  /** Clear user session */
  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("gsf_user");
  }, []);

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
