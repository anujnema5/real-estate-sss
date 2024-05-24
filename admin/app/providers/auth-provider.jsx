'use client'
import React, { createContext, useEffect, useState, useContext } from "react";
import { getMe } from "../services/me";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getAuth } from "@/features/auth/authSlice";
import { usePathname } from 'next/navigation'
import { pvtRoutes } from "@/utils/routes";

const AuthContext = createContext(null);

const useAuth = () => {
  const { push } = useRouter();
  const auth = useSelector(getAuth);
  const pathname = usePathname()

  const getUser = async () => {
    const isAuthenticated = auth?.admin && auth.token;

    if (isAuthenticated && pathname === '/') {
      push("/dashboard");
      return;
    } 
    
    else if(!isAuthenticated && pvtRoutes.includes(pathname)) {
      push("/");
    }
  };

  useEffect(() => {

    getUser();
  }, []);

  return { auth };
};

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;