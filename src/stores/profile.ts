// stores/user.ts
import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useNotifStore } from './notifications'

export const useProfileStore = defineStore('profile', () => {
  const userStore = useUserStore()
  const { showMessage } = useNotifStore()

  // Reactive state
  const isEditing = ref(false)
  const showPasswordChange = ref(false)

  // Profile data (bound to form inputs)
  const profileData = reactive({
    name: '',
    email: '',
  })

  // Password change data
  const passwordData = reactive({
    currentPassword: '',
    newPassword: '',
  })

  // Original data for comparison
  const originalData = reactive({
    name: '',
    email: '',
  })

  // Computed properties
  const hasChanges = computed(() => {
    return (
      profileData.name !== originalData.name ||
      profileData.email !== originalData.email ||
      (showPasswordChange.value && passwordData.newPassword.length > 0)
    )
  })

  // Initialize profile data
  const initializeProfile = () => {
    if (userStore.logged_user) {
      profileData.name = userStore.logged_user.name
      profileData.email = userStore.logged_user.email
      originalData.name = userStore.logged_user.name
      originalData.email = userStore.logged_user.email
    }
  }

  // Methods
  const toggleEdit = () => {
    if (isEditing.value) {
      cancelEdit()
    } else {
      isEditing.value = true
      showPasswordChange.value = false
      resetPasswordData()
    }
  }

  const togglePasswordChange = () => {
    showPasswordChange.value = !showPasswordChange.value
    if (!showPasswordChange.value) {
      resetPasswordData()
    }
  }

  const resetPasswordData = () => {
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
  }

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
