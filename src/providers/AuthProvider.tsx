// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { UserPayload } from "@/types/db";

interface AuthContextType {
  user: UserPayload | null;
  setUser: React.Dispatch<React.SetStateAction<UserPayload | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          if (user && user.profilePicture !== decoded.profilePicture) {
            decoded.profilePicture = user.profilePicture;
            setUser(decoded);
          } else {
            setUser(decoded);
          }
          setUser(decoded);
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
