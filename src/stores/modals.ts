import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const active = ref<string>('')

  const toggleModal = (activeModal: string = '') => {
    try {
      active.value = activeModal
    } catch (error) {
      console.error('Error toggling modal:', error)
    }
  }

  return { active, toggleModal }
})
