import { API_URL } from "@/config";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "@/contexts/LanguageContext";

export type UserType = "admin" | "organization" | "user";

export interface Organization {
  _id: string;
  name: string;
  detail: string;
  address: string;
  createdAt: string;
  is_active: boolean;
}
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  contact_number: string | null;
  avatar_url: string;
  organizations: Organization[];
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<boolean>;
  selectedOrganization: Organization | null;
  errors: { [key: string]: string[] };
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const { language } = useLanguage();

  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    setErrors({});
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        { headers: { "Accept-Language": language } }
      );
      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.access_token);
        setSelectedOrganization(
          response.data.user.organizations.length > 0
            ? response.data.user.organizations[0]
            : null
        );

        return true;
      } else if (response.status === 422) {
        setErrors(response.data.errors || {});
        return false;
      } else if (response.status === 400) {
        setErrors(response.data.errors || {});
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 422)
      ) {
        setErrors(error.response.data.errors || {});
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      if (response.status === 200) {
        return true;
      } else if (response.status === 422) {
        setErrors(response.data.errors || {});
        return false;
      } else if (response.status === 400) {
        setErrors(response.data.errors || {});
        return false;
      }
    } catch (error) {
      console.error("Forgot password request failed:", error);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setErrors(error.response.data.errors || {});
      } else if (error.response && error.response.status === 500) {
        setErrors({
          email: ["Server error. Please try again later."],
        });
        return false;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<boolean> => {
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword,
        confirmPassword,
      });
      if (response.status === 200) {
        return true;
      } else if (response.status === 400) {
        setErrors(response.data.errors || {});
        return false;
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setErrors(error.response.data.errors || {});
      } else if (error.response && error.response.status === 422) {
        setErrors({
          confirmPassword: [error.response.data.message],
        });
        return false;
      } else if (error.response && error.response.status === 500) {
        setErrors({
          newPassword: ["Server error. Please try again later."],
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    setUser,
    token,
    login,
    logout,
    forgotPassword,
    resetPassword,
    errors,
    selectedOrganization,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
