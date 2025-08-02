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
export const useModalStore = defineStore('modal', {
  /**
   * Store state containing modal data
   * 
   * @type {Object}
   */
  state: () => ({
    /**
     * Currently active modal identifier
     *
     * Tracks which modal is currently displayed. Empty string means no modal is active.
     * Valid values: 'login', 'signup', 'recipe', '' (empty for closed)
     *
     * @type {string}
     * @default ''
     */
    active: '' as string,
  }),

  /**
   * Store actions for modal operations
   * 
   * @type {Object}
   */
  actions: {
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
    toggleModal(activeModal: string = '') {
      try {
        this.active = activeModal
      } catch (error) {
        console.error('Error toggling modal:', error)
      }
    },

    /**
     * Open a specific modal
     *
     * Convenience method to open a modal without having to remember the toggle pattern.
     *
     * @param {string} modalType - The modal identifier to open
     * 
     * @example
     * ```typescript
     * openModal('login') // Opens login modal
     * openModal('signup') // Opens signup modal
     * ```
     */
    openModal(modalType: string) {
      this.toggleModal(modalType)
    },

    /**
     * Close all modals
     *
     * Convenience method to close all modals.
     *
     * @example
     * ```typescript
     * closeAllModals() // Closes all modals
     * ```
     */
    closeAllModals() {
      this.toggleModal('')
    },

    /**
     * Check if a specific modal is active
     *
     * @param {string} modalType - The modal identifier to check
     * @returns {boolean} True if the specified modal is active
     * 
     * @example
     * ```typescript
     * const isLoginOpen = isModalActive('login')
     * ```
     */
    isModalActive(modalType: string): boolean {
      return this.active === modalType
    },
  },

  /**
   * Store getters for computed properties
   * 
   * @type {Object}
   */
  getters: {
    /**
     * Check if any modal is currently active
     *
     * @returns {boolean} True if any modal is open
     * 
     * @example
     * ```typescript
     * const hasActiveModal = modalStore.hasActiveModal
     * ```
     */
    hasActiveModal(): boolean {
      return this.active !== ''
    },

    /**
     * Get the currently active modal type
     *
     * @returns {string} The active modal identifier or empty string
     * 
     * @example
     * ```typescript
     * const currentModal = modalStore.currentModal
     * ```
     */
    currentModal(): string {
      return this.active
    },

    /**
     * Get available modal types
     *
     * @returns {string[]} Array of valid modal identifiers
     * 
     * @example
     * ```typescript
     * const modalTypes = modalStore.availableModals
     * ```
     */
    availableModals(): string[] {
      return ['login', 'signup', 'recipe']
    },

    /**
     * Check if login modal is active
     *
     * @returns {boolean} True if login modal is open
     * 
     * @example
     * ```typescript
     * const isLoginOpen = modalStore.isLoginActive
     * ```
     */
    isLoginActive(): boolean {
      return this.active === 'login'
    },

    /**
     * Check if signup modal is active
     *
     * @returns {boolean} True if signup modal is open
     * 
     * @example
     * ```typescript
     * const isSignupOpen = modalStore.isSignupActive
     * ```
     */
    isSignupActive(): boolean {
      return this.active === 'signup'
    },

    /**
     * Check if recipe modal is active
     *
     * @returns {boolean} True if recipe modal is open
     * 
     * @example
     * ```typescript
     * const isRecipeOpen = modalStore.isRecipeActive
     * ```
     */
    isRecipeActive(): boolean {
      return this.active === 'recipe'
    },
  },
})
