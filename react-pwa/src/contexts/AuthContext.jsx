/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";
import Loading from "@/components/loading";
import API_ENDPOINTS from "@/config/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.admin.me, {
        credentials: "include",
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(API_ENDPOINTS.auth.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          data.detail &&
          Array.isArray(data.detail) &&
          data.detail.length > 0
        ) {
          throw new Error(data.detail[0].msg || "Login failed");
        }
        throw new Error(data.detail || "Login failed");
      }

      setIsAuthenticated(true);
      toast.success("Successfully logged in!");
      return true;
    } catch (error) {
      toast.error(error.message || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(API_ENDPOINTS.auth.logout, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
