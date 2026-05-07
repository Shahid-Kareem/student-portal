import { createContext, useState, useEffect } from "react";

// 1. Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // 2. Auth state
  const [auth, setAuth] = useState({
    access: null,
    refresh: null,
    isAuthenticated: false,
  });

  // 3. Load token on app start (refresh page fix)
  useEffect(() => {

    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (access) {
      setAuth({
        access,
        refresh,
        isAuthenticated: true,
      });
    }

  }, []);

  // 4. Login function
  const login = (access, refresh) => {

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    setAuth({
      access,
      refresh,
      isAuthenticated: true,
    });
  };

  // 5. Logout function
  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setAuth({
      access: null,
      refresh: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};