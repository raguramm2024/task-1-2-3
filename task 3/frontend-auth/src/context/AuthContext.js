import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      setLoading(true);
      const response = await api.post("/auth/login", credentials);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setError(null);
    try {
      setLoading(true);
      const response = await api.post("/auth/register", payload);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      setLoading(true);
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
