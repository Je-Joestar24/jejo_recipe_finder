/**
 * Notifications Store
 *
 * Manages global notification messages and provides a centralized notification system.
 * This store handles displaying temporary messages to users with automatic fade-out
 * functionality and timeout management.
 *
 * @module stores/notifications
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { defineStore } from 'pinia'

/**
 * Notifications Store - Global notification management
 *
 * Provides a centralized system for displaying temporary messages to users.
 * Features automatic message fade-out and timeout management to prevent
 * message accumulation and improve user experience.
 *
 * Features:
 * - Display temporary messages
 * - Automatic fade-out after timeout
 * - Timeout management to prevent memory leaks
 * - Centralized notification control
 *
 * @example
 * ```typescript
 * const notifStore = useNotifStore()
 * notifStore.showMessage('Recipe saved successfully!')
 * ```
 */
export const useNotifStore = defineStore('notif', {
  /**
   * Store state containing notification data
   * 
   * @type {Object}
   */
  state: () => ({
    /**
     * Current notification message
     *
     * The message currently being displayed to the user.
     * Empty string when no notification is active.
     *
     * @type {string}
     * @default ''
     */
    message: '' as string,

    /**
     * Timeout ID for message fade-out
     *
     * Stores the timeout identifier for the current message's auto-fade timer.
     * Used to clear existing timeouts when new messages are shown.
     *
     * @type {ReturnType<typeof setTimeout> | null}
     * @private
     */
    timeoutId: null as ReturnType<typeof setTimeout> | null,
  }),

  /**
   * Store actions for notification operations
   * 
   * @type {Object}
   */
  actions: {
    /**
     * Trigger message fade-out with timeout
     *
     * Sets up automatic message clearing after a specified delay.
     * Clears any existing timeout before setting a new one to prevent
     * multiple timeouts from running simultaneously.
     *
     * @private
     * @param {number} timeout - Time in milliseconds before message fades (default: 750ms)
     */
    triggerFadeOut(timeout: number = 750) {
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.message = ''
      }, timeout)
    },

    /**
     * Display a notification message
     *
     * Shows a message to the user and automatically clears it after 750ms.
     * If a message is already displayed, it will be replaced with the new message
     * and the fade-out timer will be reset.
     *
     * @param {string} message - The message to display to the user
     *
     * @example
     * ```typescript
     * showMessage('Recipe saved successfully!')
     * showMessage('Please log in to save recipes')
     * ```
     */
    showMessage(message: string) {
      this.message = message
      this.triggerFadeOut()
    },

    /**
     * Clear the current notification immediately
     *
     * Removes the current message and clears any pending timeout.
     *
     * @example
     * ```typescript
     * clearMessage() // Immediately clear notification
     * ```
     */
    clearMessage() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
      this.message = ''
    },

    /**
     * Show a success notification
     *
     * Convenience method for success messages with consistent styling.
     *
     * @param {string} message - The success message to display
     * 
     * @example
     * ```typescript
     * showSuccess('Recipe saved successfully!')
     * ```
     */
    showSuccess(message: string) {
      this.showMessage(`✅ ${message}`)
    },

    /**
     * Show an error notification
     *
     * Convenience method for error messages with consistent styling.
     *
     * @param {string} message - The error message to display
     * 
     * @example
     * ```typescript
     * showError('Failed to save recipe')
     * ```
     */
    showError(message: string) {
      this.showMessage(`❌ ${message}`)
    },

    /**
     * Show a warning notification
     *
     * Convenience method for warning messages with consistent styling.
     *
     * @param {string} message - The warning message to display
     * 
     * @example
     * ```typescript
     * showWarning('Please log in to save recipes')
     * ```
     */
    showWarning(message: string) {
      this.showMessage(`⚠️ ${message}`)
    },

    /**
     * Show an info notification
     *
     * Convenience method for info messages with consistent styling.
     *
     * @param {string} message - The info message to display
     * 
     * @example
     * ```typescript
     * showInfo('Loading recipes...')
     * ```
     */
    showInfo(message: string) {
      this.showMessage(`ℹ️ ${message}`)
    },
  },

  /**
   * Store getters for computed properties
   * 
   * @type {Object}
   */
  getters: {
    /**
     * Check if a notification is currently active
     *
     * @returns {boolean} True if a message is being displayed
     * 
     * @example
     * ```typescript
     * const hasMessage = notifStore.hasMessage
     * ```
     */
    hasMessage(): boolean {
      return this.message !== ''
    },

    /**
     * Get the current notification message
     *
     * @returns {string} The current message or empty string
     * 
     * @example
     * ```typescript
     * const currentMessage = notifStore.currentMessage
     * ```
     */
    currentMessage(): string {
      return this.message
    },

    /**
     * Check if a timeout is currently active
     *
     * @returns {boolean} True if a fade-out timeout is running
     * 
     * @example
     * ```typescript
     * const hasTimeout = notifStore.hasTimeout
     * ```
     */
    hasTimeout(): boolean {
      return this.timeoutId !== null
    },

    /**
     * Get message length for styling purposes
     *
     * @returns {number} Length of the current message
     * 
     * @example
     * ```typescript
     * const messageLength = notifStore.messageLength
     * ```
     */
    messageLength(): number {
      return this.message.length
    },

    /**
     * Check if message is a success notification
     *
     * @returns {boolean} True if message starts with success emoji
     * 
     * @example
     * ```typescript
     * const isSuccess = notifStore.isSuccessMessage
     * ```
     */
    isSuccessMessage(): boolean {
      return this.message.startsWith('✅')
    },

    /**
     * Check if message is an error notification
     *
     * @returns {boolean} True if message starts with error emoji
     * 
     * @example
     * ```typescript
     * const isError = notifStore.isErrorMessage
     * ```
     */
    isErrorMessage(): boolean {
      return this.message.startsWith('❌')
    },

    /**
     * Check if message is a warning notification
     *
     * @returns {boolean} True if message starts with warning emoji
     * 
     * @example
     * ```typescript
     * const isWarning = notifStore.isWarningMessage
     * ```
     */
    isWarningMessage(): boolean {
      return this.message.startsWith('⚠️')
    },

    /**
     * Check if message is an info notification
     *
     * @returns {boolean} True if message starts with info emoji
     * 
     * @example
     * ```typescript
     * const isInfo = notifStore.isInfoMessage
     * ```
     */
    isInfoMessage(): boolean {
      return this.message.startsWith('ℹ️')
    },
  },
})
