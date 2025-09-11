/**
 * User Store
 *
 * Manages user authentication, registration, and profile operations.
 * This store handles user login, signup, logout, and profile updates
 * with localStorage and sessionStorage persistence for demo purposes.
 *
 * @module stores/user
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import router from '@/router'
import login from '@/services/auth/login'

/**
 * User Store - Authentication and user management
 *
 * Provides comprehensive user authentication and management functionality:
 * - User registration and login
 * - Session management with localStorage/sessionStorage
 * - Profile updates and user data persistence
 * - Logout functionality with session cleanup
 *
 * Features:
 * - User registration with UUID generation
 * - Email/password authentication
 * - Session persistence across browser sessions
 * - Profile update capabilities
 * - Automatic routing after login/logout
 *
 * @example
 * ```typescript
 * const userStore = useUserStore()
 * const result = userStore.loginUser('user@example.com', 'password')
 * if (result.success) {
 *   // User logged in successfully
 * }
 * ```
 */
export const useAuthStore = defineStore('auth', {
    /**
     * Store state containing user data
     * 
     * @type {Object}
     */
    state: () => ({

        /**
         * Currently logged-in user
         *
         * The user currently authenticated in the application.
         * Stored in sessionStorage and loaded on page refresh.
         * Null when no user is logged in.
         *
         * @type {User | null}
         * @default null
         */
        logged_user: (() => {
            const storedSessionUser = sessionStorage.getItem('user')
            return storedSessionUser ? JSON.parse(storedSessionUser) : null
        })() as User | null,
        token: sessionStorage.getItem('token') || null, // token is a string or null
    }),

    /**
     * Store actions for user operations
     * 
     * @type {Object}
     */
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
        signupUser(new_user: User): { success: boolean; message: string } {
            try {
                return {
                    success: true,
                    message: 'Signup successful',
                }
            } catch (error) {
                console.error('Signup error:', error)
                return {
                    success: false,
                    message: 'An error occurred during signup',
                }
            }
        },

        /**
         * Logout current user
         *
         * Clears the current user session and redirects to home page.
         * Removes user data from sessionStorage and reloads the page.
         *
         * @example
         * ```typescript
         * logoutUser() // Logs out and redirects to home
         * ```
         */
        logoutUser() {
            this.logged_user = null
            // Remove logged_user from sessionStorage
            sessionStorage.removeItem('logged_user')

            location.reload()
        },
    },

    /**
     * Store getters for computed properties
     * 
     * @type {Object}
     */
    getters: {
        isLoggedIn(): boolean {
            return this.logged_user !== null
        },
        currentUserUuid(): string | null {
            return this.logged_user?.uuid || null
        },

    },
})
