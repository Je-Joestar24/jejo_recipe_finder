import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotifStore = defineStore('notif', () => {
  const message = ref('')
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const triggerFadeOut = () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      message.value = ''
    }, 750)
  }

  const showMessage = (param_message: string) => {
    message.value = param_message
    triggerFadeOut()
  }
  return { message, showMessage }
})
