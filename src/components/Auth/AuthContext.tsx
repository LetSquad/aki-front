import { createContext, useContext } from "react";

import { SignInFormValues } from "@models/auth/types";

type AuthContextType = {
    isSignIn: boolean;
    setSignIn: () => void;
    setSignUp: () => void;
    loginData: SignInFormValues;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useIsSignIn() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useIsSignIn must be used within a AuthProvider");
    }
    return context.isSignIn;
}

export function useSetSignIn() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useIsSignIn must be used within a AuthProvider");
    }
    return context.setSignIn;
}

export function useSetSignUp() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useSetSignUp must be used within a AuthProvider");
    }
    return context.setSignUp;
}

export function useLoginData() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useLoginData must be used within a AuthProvider");
    }
    return context.loginData;
}

export function useSetEmail() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useSetEmail must be used within a AuthProvider");
    }
    return context.setEmail;
}

export function useSetPassword() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useSetPassword must be used within a AuthProvider");
    }
    return context.setPassword;
}
