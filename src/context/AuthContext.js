import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let token;
  if (typeof window !== "undefined") {
    token = JSON.parse(localStorage.getItem("accesstoken"));
  }

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
