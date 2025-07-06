import { create } from "zustand";
import api from "../utils/api";


export const useUserStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    login: async ({ email, password }) => {
        try {
            set({ loading: true, error: null, isAuthenticated: false, user: null });
            const response = await api.post("/auth/login", { email, password })
            if (response.status === 200) {
                set({
                    user: response.data.user,
                    isAuthenticated: true,
                    loading: false,
                    error: null
                });
                localStorage.setItem("token", response.data.access_token);
                return { success: true }
            }
            else {
                set({
                    error: "Login failed. Please check your credentials.",
                    loading: false,
                    isAuthenticated: false,
                    user: null
                });
                return { success: false }
            }
        } catch (error) {
            // console.error("Login error:", error?.response);
            set({
                error: error.response?.data?.message || "An error occurred during login.",
                loading: false,
                isAuthenticated: false,
                user: null
            });
            return { success: false }
        }
    },
    logout: () => {
        set({ user: null, isAuthenticated: false })
        localStorage.removeItem("token")
    },
    signup: async ({ email, username, password }) => {
        try {
            set({ loading: true, error: null, isAuthenticated: false, user: null })
            const response = await api.post("/auth/signup", { email, username, password })
            if (response.status === 201) {
                set({ loading: false, error: null, isAuthenticated: true, user: response.data.user })
                localStorage.setItem("token", response.data.access_token)
                return { success: true }
            }
            else {
                set({
                    loading: false,
                    error: "Login failed. Please check your credentials.",
                    isAuthenticated: false,
                    user: null
                })
                return { success: false }
            }

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "An error occurred during signup.",
                isAuthenticated: false,
                user: null
            })
            return { success: false }
        }
    }
}))
