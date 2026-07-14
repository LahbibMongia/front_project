import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token") || null);
  const [user, setUserState] = useState(null);
  const [role, setRoleState] = useState(localStorage.getItem("role") || null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedUser) {
      setTokenState(storedToken);
      try {
        setUserState(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
        // Clean up invalid session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setTokenState(null);
        setUserState(null);
        setRoleState(null);
      }
      setRoleState(storedRole);
    }
    setLoading(false);
  }, []);

  /**
   * Log in user by saving credentials in state and localStorage.
   */
  const login = (newToken, newUser, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", newRole || "");
    
    setTokenState(newToken);
    setUserState(newUser);
    setRoleState(newRole || "");
  };

  /**
   * Log out user by clearing state and localStorage.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    
    setTokenState(null);
    setUserState(null);
    setRoleState(null);
  };

  /**
   * Update the logged in user details dynamically.
   */
  const setUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserState(updatedUser);
    if (updatedUser && updatedUser.role) {
      localStorage.setItem("role", updatedUser.role);
      setRoleState(updatedUser.role);
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        login,
        logout,
        setUser,
        loading
      }}
    >
      {!loading && children}
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
