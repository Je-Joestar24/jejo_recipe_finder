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

// stores/user.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import router from '@/router'

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
export const useUserStore = defineStore('user', () => {
  /**
   * All registered users
   *
   * Array of all user accounts stored in localStorage.
   * Loaded on store initialization and updated when users register.
   *
   * @type {Ref<Array<User>>}
   * @default []
   */
  const storedUsers = localStorage.getItem('users')
  const users = ref<Array<User>>(storedUsers ? JSON.parse(storedUsers) : [])

  /**
   * Currently logged-in user
   *
   * The user currently authenticated in the application.
   * Stored in sessionStorage and loaded on page refresh.
   * Null when no user is logged in.
   *
   * @type {Ref<User | null>}
   * @default null
   */
  const storedSessionUser = sessionStorage.getItem('logged_user')
  const logged_user = ref<User | null>(storedSessionUser ? JSON.parse(storedSessionUser) : null)

  /**
   * Generate UUID from current date/time
   *
   * Creates a unique identifier based on the current timestamp.
   * Used for user identification and saved recipes storage keys.
   * Format: YYYYMMDDHHMMSS (hexadecimal)
   *
   * @private
   * @returns {string} Unique identifier based on current timestamp
   *
   * @example
   * ```typescript
   * const uuid = generateUUIDFromDate() // "20231201143022"
   * ```
   */
  const generateUUIDFromDate = (): string => {
    const now = new Date()
    return (
      now.getFullYear().toString(16) +
      (now.getMonth() + 1).toString(16).padStart(2, '0') +
      now.getDate().toString(16).padStart(2, '0') +
      now.getHours().toString(16).padStart(2, '0') +
      now.getMinutes().toString(16).padStart(2, '0') +
      now.getSeconds().toString(16).padStart(2, '0') +
      now.getMilliseconds().toString(16).padStart(3, '0')
    )
  }

  /**
   * Authenticate user with email and password
   *
   * Validates user credentials and creates a session if authentication succeeds.
   * Stores user data in sessionStorage and redirects to search page.
   *
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Object} Authentication result with success status and message
   * @returns {boolean} returns.success - True if login successful
   * @returns {string} returns.message - Success or error message
   *
   * @example
   * ```typescript
   * const result = loginUser('user@example.com', 'password123')
   * if (result.success) {
   *   console.log('Login successful')
   * } else {
   *   console.log('Login failed:', result.message)
   * }
   * ```
   */
  const loginUser = (email: string, password: string): { success: boolean; message: string } => {
    try {
      const found_user = users.value.find(
        (user) => user.email === email && user.password === password,
      )

      if (!found_user) {
        return {
          success: false,
          message: 'Invalid email or password',
        }
      }

      logged_user.value = found_user
      // Store logged_user in sessionStorage
      sessionStorage.setItem('logged_user', JSON.stringify(found_user))
      window.location.reload()
      router.push('/search')
      return {
        success: true,
        message: 'Login successful',
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'An error occurred during login',
      }
    }
  }

  /**
   * Register a new user account
   *
   * Creates a new user account with auto-generated UUID.
   * Validates that email is not already in use.
   * Stores user data in localStorage for persistence.
   *
   * @param {User} new_user - User data for registration
   * @returns {Object} Registration result with success status and message
   * @returns {boolean} returns.success - True if registration successful
   * @returns {string} returns.message - Success or error message
   *
   * @example
   * ```typescript
   * const newUser: User = {
   *   name: 'John Doe',
   *   email: 'john@example.com',
   *   password: 'password123'
   * }
   * const result = signupUser(newUser)
   * if (result.success) {
   *   console.log('Registration successful')
   * } else {
   *   console.log('Registration failed:', result.message)
   * }
   * ```
   */
  const signupUser = (new_user: User): { success: boolean; message: string } => {
    try {
      const existing_user = users.value.find((user) => user.email === new_user.email)

      if (existing_user) {
        return {
          success: false,
          message: 'Email already in use',
        }
      }

      new_user.uuid = generateUUIDFromDate()
      users.value.push(new_user)
      // Update localStorage
      localStorage.setItem('users', JSON.stringify(users.value))

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
  }

  /**
   * Update user profile information
   *
   * Updates user data in the store and persists changes to localStorage.
   * Updates both the users array and sessionStorage for current user.
   *
   * @async
   * @param {User} updatedUser - Updated user data
   * @returns {Promise<Object>} Update result with success status and message
   * @returns {boolean} returns.success - True if update successful
   * @returns {string} returns.message - Success or error message
   *
   * @example
   * ```typescript
   * const updatedUser = { ...currentUser, name: 'New Name' }
   * const result = await updateUserProfile(updatedUser)
   * if (result.success) {
   *   console.log('Profile updated successfully')
   * }
   * ```
   */
  const updateUserProfile = async (
    updatedUser: User,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Find and update user in the users array
      const userIndex = users.value.findIndex((user) => user.uuid === updatedUser.uuid)

      if (userIndex === -1) {
        return {
          success: false,
          message: 'User not found',
        }
      }

      // Update user in the array
      users.value[userIndex] = updatedUser

      // Update localStorage
      localStorage.setItem('users', JSON.stringify(users.value))

      // Update logged_user in store and sessionStorage
      logged_user.value = updatedUser
      sessionStorage.setItem('logged_user', JSON.stringify(updatedUser))

      return {
        success: true,
        message: 'Profile updated successfully',
      }
    } catch (error) {
      console.error('Profile update error:', error)
      return {
        success: false,
        message: 'An error occurred while updating profile',
      }
    }
  }

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
  const logoutUser = () => {
    logged_user.value = null
    // Remove logged_user from sessionStorage
    sessionStorage.removeItem('logged_user')

    location.reload()
  }

  return { signupUser, loginUser, logged_user, logoutUser, updateUserProfile }
})
