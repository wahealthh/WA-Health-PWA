/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import Loading from "@/components/loading";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://your-backend/api/auth/verify", {
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
      const response = await fetch("http://your-backend/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
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
      await fetch("http://your-backend/api/auth/logout", {
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
