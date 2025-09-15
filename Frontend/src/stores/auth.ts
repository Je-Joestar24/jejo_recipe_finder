/**
 * User Store
 *
 * Manages user authentication, registration, and profile operations.
 * This store handles user login, signup, logout, and profile updates
 * with sessionStorage persistence for demo purposes.
 *
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import router from '@/router'
import login from '@/services/auth/login'
import signup from '@/services/auth/signup'
import type { SignupPayload } from '@/types/auth'
import logout from '@/services/auth/logout'

export const useAuthStore = defineStore('auth', {
    state: () => ({

        logged_user: (() => {
            const storedSessionUser = sessionStorage.getItem('user')
            return storedSessionUser ? JSON.parse(storedSessionUser) : null
        })() as User | null,
        token: sessionStorage.getItem('token') || null, // token is a string or null
    }),

    actions: {

        async loginUser(
            email: string,
            password: string
        ): Promise<{ success: boolean; message: string }> {
            try {
                const result = await login(email, password)

                if (result.success) {
                    // Save user and token in Pinia state
                    this.logged_user = result.data.user
                    this.token = result.data.token

                    // Save to sessionStorage for persistence
                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)

                    // Redirect after login
                    router.push("/search")

                    return {
                        success: true,
                        message: result.data.message || "Login successful",
                    }
                } else {
                    return {
                        success: false,
                        message: result.error || "Login failed",
                    }
                }
            } catch (error) {
                console.error("Login error:", error)
                return {
                    success: false,
                    message: "An error occurred during login",
                }
            }
        },
        async signupUser(new_user: SignupPayload): Promise<{ success: boolean; message: string }> {
            try {
                const response = await signup(new_user)

                if (response.success) {
                    return {
                        success: true,
                        message: "Signup successful",
                    }
                } else {
                    return {
                        success: false,
                        message: response.error ?? "Signup failed",
                    }
                }
            } catch (error) {
                console.error("Signup error:", error)
                return {
                    success: false,
                    message: "An unexpected error occurred during signup",
                }
            }
        }, async logoutUser(): Promise<{ success: boolean; message: string }> {
            try {
                const response = await logout()

                if (response.success) {
                    // Clear local state
                    this.logged_user = null
                    this.token = null

                    // Remove from sessionStorage
                    sessionStorage.removeItem("user")
                    sessionStorage.removeItem("token")

                    router.push("/")

                    return {
                        success: true,
                        message: "Logout successful",
                    }
                } else {
                    return {
                        success: false,
                        message: response.error ?? "Logout failed",
                    }
                }
            } catch (error) {
                console.error("Logout error:", error)
                return {
                    success: false,
                    message: "An unexpected error occurred during logout",
                }
            }
        }
    },

    getters: {
        isLoggedIn(): boolean {
            return this.logged_user !== null
        },
    },
})
