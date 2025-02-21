import { createContext,useState,useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

// Auth Provider to store user info
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null); // Store user info in state


  const login = (userData) => { 
    
    localStorage.setItem("access_token", userData.access_token);
    localStorage.setItem("refresh_token", userData.refresh_token);

    const decoded = jwtDecode(userData.access_token); 
    console.log(decoded)
    setUser(decoded);

    return decoded
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);