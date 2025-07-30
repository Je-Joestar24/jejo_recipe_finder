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

import { ref } from 'vue'
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
export const useNotifStore = defineStore('notif', () => {
  /**
   * Current notification message
   *
   * The message currently being displayed to the user.
   * Empty string when no notification is active.
   *
   * @type {Ref<string>}
   * @default ''
   */
  const message = ref('')

  /**
   * Timeout ID for message fade-out
   *
   * Stores the timeout identifier for the current message's auto-fade timer.
   * Used to clear existing timeouts when new messages are shown.
   *
   * @type {ReturnType<typeof setTimeout> | null}
   * @private
   */
  let timeoutId: ReturnType<typeof setTimeout> | null = null

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
  const triggerFadeOut = () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      message.value = ''
    }, 750)
  }

  /**
   * Display a notification message
   *
   * Shows a message to the user and automatically clears it after 750ms.
   * If a message is already displayed, it will be replaced with the new message
   * and the fade-out timer will be reset.
   *
   * @param {string} param_message - The message to display to the user
   *
   * @example
   * ```typescript
   * showMessage('Recipe saved successfully!')
   * showMessage('Please log in to save recipes')
   * ```
   */
  const showMessage = (param_message: string) => {
    message.value = param_message
    triggerFadeOut()
  }

  return { message, showMessage }
})
