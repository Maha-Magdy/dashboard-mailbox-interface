import { create } from "zustand";
import type { User } from "../types/user";
import { persist } from "zustand/middleware";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (user) => {
                set({
                    isAuthenticated: true,
                    user,
                });
            },
            logout: () => {
                set({
                    isAuthenticated: false,
                    user: null,
                });
            },
        }),
        { name: 'auth-storage', }
    )
);