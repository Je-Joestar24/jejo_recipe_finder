/**
 * Profile Store
 *
 * Manages user profile editing functionality and form state for profile updates.
 * This store handles profile data editing, password changes, and validation
 * while maintaining original data for comparison and rollback capabilities.
 *
 * @module stores/profile
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import { useUserStore } from '@/stores/user'
import { useNotifStore } from './notifications'

/**
 * Profile form data interface
 */
interface ProfileData {
  name: string
  email: string
}

/**
 * Password form data interface
 */
interface PasswordData {
  currentPassword: string
  newPassword: string
}

/**
 * Profile Store - User profile editing and management
 *
 * Provides comprehensive profile editing functionality including:
 * - Form state management for profile data
 * - Password change functionality
 * - Change tracking and validation
 * - Integration with user store for persistence
 *
 * Features:
 * - Edit mode toggling
 * - Password change interface
 * - Form validation
 * - Change detection
 * - Profile data persistence
 *
 * @example
 * ```typescript
 * const profileStore = useProfileStore()
 * profileStore.toggleEdit() // Enter edit mode
 * profileStore.saveProfile() // Save changes
 * ```
 */
export const useProfileStore = defineStore('profile', {
  /**
   * Store state containing profile data
   * 
   * @type {Object}
   */
  state: () => ({
    /**
     * Edit mode state
     *
     * Controls whether the profile is currently in edit mode.
     * When true, form fields become editable and save/cancel buttons are shown.
     *
     * @type {boolean}
     * @default false
     */
    isEditing: false,

    /**
     * Password change interface visibility
     *
     * Controls the visibility of the password change form section.
     * When true, password change fields are displayed.
     *
     * @type {boolean}
     * @default false
     */
    showPasswordChange: false,

    /**
     * Profile form data
     *
     * Reactive object containing the current form values for profile editing.
     * Bound to form inputs and updated as user types.
     *
     * @type {ProfileData}
     * @property {string} name - User's display name
     * @property {string} email - User's email address
     */
    profileData: {
      name: '',
      email: '',
    } as ProfileData,

    /**
     * Password change form data
     *
     * Reactive object containing password change form values.
     * Used for current password verification and new password input.
     *
     * @type {PasswordData}
     * @property {string} currentPassword - Current password for verification
     * @property {string} newPassword - New password to set
     */
    passwordData: {
      currentPassword: '',
      newPassword: '',
    } as PasswordData,

    /**
     * Original profile data for comparison
     *
     * Stores the original profile values to detect changes and enable rollback.
     * Used to determine if any changes have been made and to restore original values.
     *
     * @type {ProfileData}
     * @property {string} name - Original display name
     * @property {string} email - Original email address
     */
    originalData: {
      name: '',
      email: '',
    } as ProfileData,
  }),

  /**
   * Store actions for profile operations
   * 
   * @type {Object}
   */
  actions: {
    /**
     * Initialize profile data from user store
     *
     * Loads current user data into the profile form and stores original values.
     * Called on store initialization and when user data changes.
     *
     * @private
     */
    initializeProfile() {
      const userStore = useUserStore()
      if (userStore.logged_user) {
        this.profileData.name = userStore.logged_user.name
        this.profileData.email = userStore.logged_user.email
        this.originalData.name = userStore.logged_user.name
        this.originalData.email = userStore.logged_user.email
      }
    },

    /**
     * Toggle edit mode
     *
     * Switches between view and edit modes. When entering edit mode,
     * password change is disabled and password data is reset.
     * When canceling edit mode, form data is restored to original values.
     *
     * @example
     * ```typescript
     * toggleEdit() // Enter edit mode
     * toggleEdit() // Exit edit mode and cancel changes
     * ```
     */
    toggleEdit() {
      if (this.isEditing) {
        this.cancelEdit()
      } else {
        this.isEditing = true
        this.showPasswordChange = false
        this.resetPasswordData()
      }
    },

    /**
     * Toggle password change interface
     *
     * Shows or hides the password change form section.
     * When hiding, password data is cleared for security.
     *
     * @example
     * ```typescript
     * togglePasswordChange() // Show password change form
     * togglePasswordChange() // Hide password change form
     * ```
     */
    togglePasswordChange() {
      this.showPasswordChange = !this.showPasswordChange
      if (!this.showPasswordChange) {
        this.resetPasswordData()
      }
    },

    /**
     * Reset password form data
     *
     * Clears all password change form fields for security.
     * Called when password change is disabled or form is reset.
     *
     * @private
     */
    resetPasswordData() {
      this.passwordData.currentPassword = ''
      this.passwordData.newPassword = ''
    },

    /**
     * Cancel edit mode and restore original data
     *
     * Exits edit mode and restores all form data to original values.
     * Clears password change interface and resets password data.
     *
     * @example
     * ```typescript
     * cancelEdit() // Cancel all changes and exit edit mode
     * ```
     */
    cancelEdit() {
      this.isEditing = false
      this.showPasswordChange = false
      this.resetPasswordData()

      // Reset to original values
      const userStore = useUserStore()
      if (userStore.logged_user) {
        this.profileData.name = this.originalData.name
        this.profileData.email = this.originalData.email
      }
    },

    /**
     * Save profile changes
     *
     * Validates and saves profile changes to the user store.
     * Performs validation for password changes and updates user data.
     * Shows success/error messages and resets form state on completion.
     *
     * @async
     * @throws {Error} When profile update fails
     *
     * @example
     * ```typescript
     * await saveProfile() // Save all changes
     * ```
     */
    async saveProfile() {
      const userStore = useUserStore()
      const notifStore = useNotifStore()

      if (!userStore.logged_user) return

      try {
        // Validate password change if active
        if (this.showPasswordChange && this.passwordData.newPassword.length > 0) {
          if (this.passwordData.currentPassword !== userStore.logged_user.password) {
            notifStore.showMessage('Current password is incorrect')
            return
          }
          if (this.passwordData.newPassword.length < 6) {
            notifStore.showMessage('New password must be at least 6 characters long')
            return
          }
        }

        // Update user data
        const updatedUser: User = {
          ...userStore.logged_user,
          name: this.profileData.name,
          email: this.profileData.email,
          password:
            this.showPasswordChange && this.passwordData.newPassword.length > 0
              ? this.passwordData.newPassword
              : userStore.logged_user.password,
        }

        // Update in store (this will update localStorage and sessionStorage)
        await userStore.updateUserProfile(updatedUser)

        // Update original data
        this.originalData.name = this.profileData.name
        this.originalData.email = this.profileData.email

        // Reset form state
        this.isEditing = false
        this.showPasswordChange = false
        this.resetPasswordData()

        notifStore.showMessage('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        notifStore.showMessage('Failed to update profile. Please try again.')
      }
    },

    /**
     * Update profile data field
     *
     * Updates a specific field in the profile form data.
     * Used for form input binding.
     *
     * @param {string} field - The field to update ('name' or 'email')
     * @param {string} value - The new value for the field
     * 
     * @example
     * ```typescript
     * updateProfileField('name', 'John Doe')
     * updateProfileField('email', 'john@example.com')
     * ```
     */
    updateProfileField(field: 'name' | 'email', value: string) {
      if (field in this.profileData) {
        this.profileData[field] = value
      }
    },

    /**
     * Update password data field
     *
     * Updates a specific field in the password form data.
     * Used for password form input binding.
     *
     * @param {string} field - The field to update ('currentPassword' or 'newPassword')
     * @param {string} value - The new value for the field
     * 
     * @example
     * ```typescript
     * updatePasswordField('currentPassword', 'oldpass123')
     * updatePasswordField('newPassword', 'newpass123')
     * ```
     */
    updatePasswordField(field: 'currentPassword' | 'newPassword', value: string) {
      if (field in this.passwordData) {
        this.passwordData[field] = value
      }
    },
  },

  /**
   * Store getters for computed properties
   * 
   * @type {Object}
   */
  getters: {
    /**
     * Check if any form changes have been made
     *
     * Returns true if any profile data or password has been modified.
     * Used to enable/disable save button and show unsaved changes warnings.
     *
     * @returns {boolean} True if any changes have been made
     * 
     * @example
     * ```typescript
     * const hasChanges = profileStore.hasChanges
     * ```
     */
    hasChanges(): boolean {
      return (
        this.profileData.name !== this.originalData.name ||
        this.profileData.email !== this.originalData.email ||
        (this.showPasswordChange && this.passwordData.newPassword.length > 0)
      )
    },

    /**
     * Check if profile data has changed
     *
     * @returns {boolean} True if profile data has been modified
     * 
     * @example
     * ```typescript
     * const hasProfileChanges = profileStore.hasProfileChanges
     * ```
     */
    hasProfileChanges(): boolean {
      return (
        this.profileData.name !== this.originalData.name ||
        this.profileData.email !== this.originalData.email
      )
    },

    /**
     * Check if password data has changed
     *
     * @returns {boolean} True if password data has been modified
     * 
     * @example
     * ```typescript
     * const hasPasswordChanges = profileStore.hasPasswordChanges
     * ```
     */
    hasPasswordChanges(): boolean {
      return this.showPasswordChange && this.passwordData.newPassword.length > 0
    },

    /**
     * Get current profile data
     *
     * @returns {ProfileData} Current profile form data
     * 
     * @example
     * ```typescript
     * const profileData = profileStore.currentProfileData
     * ```
     */
    currentProfileData(): ProfileData {
      return this.profileData
    },

    /**
     * Get current password data
     *
     * @returns {PasswordData} Current password form data
     * 
     * @example
     * ```typescript
     * const passwordData = profileStore.currentPasswordData
     * ```
     */
    currentPasswordData(): PasswordData {
      return this.passwordData
    },

    /**
     * Check if password change is active
     *
     * @returns {boolean} True if password change interface is visible
     * 
     * @example
     * ```typescript
     * const isPasswordChangeActive = profileStore.isPasswordChangeActive
     * ```
     */
    isPasswordChangeActive(): boolean {
      return this.showPasswordChange
    },

    /**
     * Check if edit mode is active
     *
     * @returns {boolean} True if profile is in edit mode
     * 
     * @example
     * ```typescript
     * const isEditMode = profileStore.isEditMode
     * ```
     */
    isEditMode(): boolean {
      return this.isEditing
    },
  },
})
