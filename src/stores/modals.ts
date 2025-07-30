/**
 * Modal Store
 *
 * Manages the global modal state and provides centralized modal control.
 * This store handles which modal is currently active and provides methods
 * to toggle between different modal types (login, signup, recipe, etc.).
 *
 * @module stores/modals
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Modal Store - Global modal state management
 *
 * Provides centralized control over modal visibility and state.
 * Supports multiple modal types and ensures only one modal is active at a time.
 *
 * Features:
 * - Track currently active modal
 * - Toggle modal visibility
 * - Error handling for modal operations
 *
 * @example
 * ```typescript
 * const modalStore = useModalStore()
 * modalStore.toggleModal('login') // Opens login modal
 * modalStore.toggleModal('') // Closes all modals
 * ```
 */
export const useModalStore = defineStore('modal', () => {
  /**
   * Currently active modal identifier
   *
   * Tracks which modal is currently displayed. Empty string means no modal is active.
   * Valid values: 'login', 'signup', 'recipe', '' (empty for closed)
   *
   * @type {Ref<string>}
   * @default ''
   */
  const active = ref<string>('')

  /**
   * Toggle modal visibility
   *
   * Opens or closes a modal by setting the active modal identifier.
   * Passing an empty string closes all modals.
   *
   * @param {string} activeModal - The modal identifier to activate, or empty string to close
   * @throws {Error} When modal toggle operation fails
   *
   * @example
   * ```typescript
   * toggleModal('login') // Opens login modal
   * toggleModal('') // Closes all modals
   * ```
   */
  const toggleModal = (activeModal: string = '') => {
    try {
      active.value = activeModal
    } catch (error) {
      console.error('Error toggling modal:', error)
    }
  }

  return { active, toggleModal }
})
