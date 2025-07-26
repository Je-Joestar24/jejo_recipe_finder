// stores/user.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/stores/types'

export const useUserStore = defineStore('user', () => {
  // Load users from localStorage or initialize as empty array
  const storedUsers = localStorage.getItem('users')

  const users = ref<Array<User>>(storedUsers ? JSON.parse(storedUsers) : [])

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

  return { signupUser }
})
