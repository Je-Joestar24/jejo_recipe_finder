// stores/user.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/stores/types'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // Load users from localStorage or initialize as empty array
  const storedUsers = localStorage.getItem('users')

  const users = ref<Array<User>>(storedUsers ? JSON.parse(storedUsers) : [])

  const storedSessionUser = sessionStorage.getItem('logged_user')
  const logged_user = ref<User | null>(storedSessionUser ? JSON.parse(storedSessionUser) : null)

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

  const logoutUser = () => {
    logged_user.value = null
    // Remove logged_user from sessionStorage
    sessionStorage.removeItem('logged_user')

    location.reload()
  }

  return { signupUser, loginUser, logged_user, logoutUser, updateUserProfile }
})
