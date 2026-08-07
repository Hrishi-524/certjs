"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MeResponse } from "@/types/auth.types";
type AuthContextValue = {
    user: MeResponse["user"];
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
    user,
    children,
}: {
    user: MeResponse["user"];
    children: ReactNode;
}) {
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider."
        );
    }

    return context;
}