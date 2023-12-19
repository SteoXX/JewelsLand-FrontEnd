import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Request to see if the user is logged in
    axios
      .get("https://localhost:443/checkLoginStatus", { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch((error) => {
        console.error("Error checking login status", error);
      });

    // Request to see if the user is an administrator
    axios
      .get("https://localhost:443/checkAdminStatus", { withCredentials: true })
      .then((response) => {
        setAdmin(response.data.admin);
      })
      .catch((error) => {
        console.error("Error checking admin status", error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
