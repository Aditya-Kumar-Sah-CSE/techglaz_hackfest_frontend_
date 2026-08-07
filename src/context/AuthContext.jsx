// ==========================================
// AuthContext.jsx
// GuardianAI Role-Based Authentication
// ==========================================

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("guardianai-role");
    const savedUser = localStorage.getItem("guardianai-user");
    const savedToken = localStorage.getItem("guardianai-token");

    if (savedToken && savedRole && savedUser) {
      setRole(savedRole);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, selectedRole) => {
    const token = "guardianai-temp-token-" + Date.now();
    localStorage.setItem("guardianai-token", token);
    localStorage.setItem("guardianai-role", selectedRole);
    localStorage.setItem("guardianai-user", JSON.stringify(userData));

    // Keep legacy token for backward compat with existing code
    localStorage.setItem("token", token);

    setUser(userData);
    setRole(selectedRole);

    return selectedRole === "police" ? "/police/dashboard" : "/dashboard";
  };

  const logout = () => {
    localStorage.removeItem("guardianai-token");
    localStorage.removeItem("guardianai-role");
    localStorage.removeItem("guardianai-user");
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: role === "admin",
    isPolice: role === "police",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Protected Route component
export function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (!loading && allowedRole && role !== allowedRole) {
      // Redirect to correct dashboard if wrong role
      navigate(role === "police" ? "/police/dashboard" : "/dashboard", {
        replace: true,
      });
    }
  }, [loading, isAuthenticated, role, allowedRole, navigate]);

  if (loading) return null;
  if (!isAuthenticated) return null;
  if (allowedRole && role !== allowedRole) return null;

  return children;
}

export default AuthContext;
