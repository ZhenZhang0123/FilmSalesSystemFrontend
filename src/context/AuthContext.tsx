import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  roles: string[];
  login: (token: string, username: string, roles: string[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
  const [roles, setRoles] = useState<string[]>(JSON.parse(localStorage.getItem("roles") || "[]"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username || "");
      localStorage.setItem("roles", JSON.stringify(roles));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
    }
  }, [token, username, roles]);

  const login = (token: string, username: string, roles: string[]) => {
    setToken(token);
    setUsername(username);
    setRoles(roles);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ token, username, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
