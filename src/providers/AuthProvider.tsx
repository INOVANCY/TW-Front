// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";

// types.ts
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  iat: number; // Timestamp d'émission
  exp: number; // Timestamp d'expiration
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    console.log("AuthProvider is checking user for ", pathName);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
          console.log("User is set to ", decoded);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  }, [pathName]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "Thrills World's useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
