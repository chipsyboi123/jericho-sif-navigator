import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Verify token is still valid
    apiFetch<{ email: string }>("/api/auth/me")
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await apiFetch<{ token: string; email: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("admin_token", data.token);
      setIsAuthenticated(true);
      return null; // no error
    } catch (err: any) {
      return { message: err.message || "Login failed" };
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  }, []);

  return { session: null, loading, login, logout, isAuthenticated };
}
