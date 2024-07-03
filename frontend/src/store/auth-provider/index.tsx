// auth-context.tsx
import type { LoginUser } from "@/types";
import { useCookie } from "@/hooks/use-cookie";
import authService from "@/services/auth.service";
import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextValue {
    isAuthenticated: boolean;
    currentUser: LoginUser;
    login: (user: LoginUser) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setcurrentUser] = useState<LoginUser>({} as LoginUser);
    const { getCookie, removeCookie, setCookie } = useCookie();

    useEffect(() => {
        // Check if the user is already authenticated (e.g., from Cookie)
        const currentUser = getCookie("user");
        const isAuthenticated = Boolean(currentUser);
        if (isAuthenticated) {
            setIsAuthenticated(isAuthenticated);
            setcurrentUser((prev) => ({ ...prev, ...currentUser }));
        }
    }, []);

    const login = async (user: LoginUser) => {
        await new Promise((r) => setTimeout(r, 1000)); //
        setCookie("user", user);
        setIsAuthenticated(true);
        setcurrentUser((prev) => ({ ...prev, ...user }));
    };

    const logout = async () => {
        try {
            await authService.logout();
            removeCookie("user");
            setIsAuthenticated(false);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    const authContextValue: AuthContextValue = {
        isAuthenticated,
        currentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export type { AuthContextValue };
export const useAuth = () => useContext(AuthContext);
