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

// stores/user.ts
import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useNotifStore } from './notifications'

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
export const useProfileStore = defineStore('profile', () => {
  const userStore = useUserStore()
  const { showMessage } = useNotifStore()

  /**
   * Edit mode state
   *
   * Controls whether the profile is currently in edit mode.
   * When true, form fields become editable and save/cancel buttons are shown.
   *
   * @type {Ref<boolean>}
   * @default false
   */
  const isEditing = ref(false)

  /**
   * Password change interface visibility
   *
   * Controls the visibility of the password change form section.
   * When true, password change fields are displayed.
   *
   * @type {Ref<boolean>}
   * @default false
   */
  const showPasswordChange = ref(false)

  /**
   * Profile form data
   *
   * Reactive object containing the current form values for profile editing.
   * Bound to form inputs and updated as user types.
   *
   * @type {ReactiveObject}
   * @property {string} name - User's display name
   * @property {string} email - User's email address
   */
  const profileData = reactive({
    name: '',
    email: '',
  })

  /**
   * Password change form data
   *
   * Reactive object containing password change form values.
   * Used for current password verification and new password input.
   *
   * @type {ReactiveObject}
   * @property {string} currentPassword - Current password for verification
   * @property {string} newPassword - New password to set
   */
  const passwordData = reactive({
    currentPassword: '',
    newPassword: '',
  })

  /**
   * Original profile data for comparison
   *
   * Stores the original profile values to detect changes and enable rollback.
   * Used to determine if any changes have been made and to restore original values.
   *
   * @type {ReactiveObject}
   * @property {string} name - Original display name
   * @property {string} email - Original email address
   */
  const originalData = reactive({
    name: '',
    email: '',
  })

  /**
   * Computed property to detect form changes
   *
   * Returns true if any profile data or password has been modified.
   * Used to enable/disable save button and show unsaved changes warnings.
   *
   * @type {ComputedRef<boolean>}
   * @returns {boolean} True if any changes have been made
   */
  const hasChanges = computed(() => {
    return (
      profileData.name !== originalData.name ||
      profileData.email !== originalData.email ||
      (showPasswordChange.value && passwordData.newPassword.length > 0)
    )
  })

  /**
   * Initialize profile data from user store
   *
   * Loads current user data into the profile form and stores original values.
   * Called on store initialization and when user data changes.
   *
   * @private
   */
  const initializeProfile = () => {
    if (userStore.logged_user) {
      profileData.name = userStore.logged_user.name
      profileData.email = userStore.logged_user.email
      originalData.name = userStore.logged_user.name
      originalData.email = userStore.logged_user.email
    }
  }

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
  const toggleEdit = () => {
    if (isEditing.value) {
      cancelEdit()
    } else {
      isEditing.value = true
      showPasswordChange.value = false
      resetPasswordData()
    }
  }

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
  const togglePasswordChange = () => {
    showPasswordChange.value = !showPasswordChange.value
    if (!showPasswordChange.value) {
      resetPasswordData()
    }
  }

  /**
   * Reset password form data
   *
   * Clears all password change form fields for security.
   * Called when password change is disabled or form is reset.
   *
   * @private
   */
  const resetPasswordData = () => {
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
  }

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
  const cancelEdit = () => {
    isEditing.value = false
    showPasswordChange.value = false
    resetPasswordData()

    // Reset to original values
    if (userStore.logged_user) {
      profileData.name = originalData.name
      profileData.email = originalData.email
    }
  }

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
  const saveProfile = async () => {
    if (!userStore.logged_user) return

    try {
      // Validate password change if active
      if (showPasswordChange.value && passwordData.newPassword.length > 0) {
        if (passwordData.currentPassword !== userStore.logged_user.password) {
          showMessage('Current password is incorrect')
          return
        }
        if (passwordData.newPassword.length < 6) {
          showMessage('New password must be at least 6 characters long')
          return
        }
      }

      // Update user data
      const updatedUser: User = {
        ...userStore.logged_user,
        name: profileData.name,
        email: profileData.email,
        password:
          showPasswordChange.value && passwordData.newPassword.length > 0
            ? passwordData.newPassword
            : userStore.logged_user.password,
      }

      // Update in store (this will update localStorage and sessionStorage)
      await userStore.updateUserProfile(updatedUser)

      // Update original data
      originalData.name = profileData.name
      originalData.email = profileData.email

      // Reset form state
      isEditing.value = false
      showPasswordChange.value = false
      resetPasswordData()

      showMessage('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      showMessage('Failed to update profile. Please try again.')
    }
  }

  initializeProfile()

  // Watch for logged user changes
  watch(
    () => userStore.logged_user,
    () => {
      initializeProfile()
    },
    { immediate: true },
  )

  return {
    isEditing,
    showPasswordChange,
    profileData,
    passwordData,
    originalData,
    hasChanges,
    initializeProfile,
    toggleEdit,
    togglePasswordChange,
    resetPasswordData,
    cancelEdit,
    saveProfile,
  }
})
