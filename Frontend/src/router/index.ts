/**
 * Router Configuration
 *
 * Main router configuration for the Jejo Recipe Finder application.
 * This module sets up Vue Router with web history mode, defines global
 * route guards for authentication, and handles navigation notifications.
 *
 * @module router/index
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { ref } from 'vue'
import { useNotifStore } from '@/stores/notifications'
import { useAuthStore } from '@/stores/auth'

/**
 * Vue Router instance with web history mode
 *
 * Creates the main router instance using HTML5 history mode for clean URLs.
 * Uses the routes defined in the routes module and sets the base URL
 * from environment variables.
 *
 * @type {Router}
 * @example
 * ```typescript
 * // Navigate programmatically
 * router.push('/search')
 * router.push({ name: 'profile' })
 * ```
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


/**
 * Global route guard for authentication and navigation
 *
 * Intercepts all route navigation to perform authentication checks
 * and show navigation notifications. Handles both protected routes
 * (requires authentication) and guest-only routes.
 *
 * Authentication Logic:
 * - Checks if route requires authentication (requiresAuth meta)
 * - Redirects unauthenticated users to home page
 * - Handles guest-only routes (requiresGuest meta)
 * - Shows navigation notifications for all route changes
 *
 * @param {RouteLocationNormalized} to - Target route being navigated to
 * @param {RouteLocationNormalized} from - Current route being navigated from
 * @param {NavigationGuardNext} next - Function to continue or redirect navigation
 *
 * @example
 * ```typescript
 * // Route with authentication required
 * {
 *   path: '/profile',
 *   meta: { requiresAuth: true }
 * }
 *
 * // Guest-only route
 * {
 *   path: '/',
 *   meta: { requiresGuest: true }
 * }
 * ```
 */
router.beforeEach((to, from, next) => {
  /**
   * Current logged-in user state
   *
   * Reactive reference to the currently authenticated user.
   * Loaded from sessionStorage on router initialization to maintain
   * authentication state across page refreshes.
   *
   * @type {Ref<User | null>}
   * @default null
   */
  const storedSessionUser = useAuthStore()
  /**
   * Check if route requires authentication
   *
   * Determines if the target route has the requiresAuth meta flag.
   * Used to protect routes that should only be accessible to logged-in users.
   *
   * @type {boolean}
   */
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  /**
   * Notification store instance
   *
   * Used to display navigation notifications to users.
   * Shows the page name when navigating to different routes.
   *
   * @type {NotificationStore}
   */
  const notifStore = useNotifStore()

  /**
   * Page name for notification
   *
   * Formats the route name for display in navigation notifications.
   * Adds "Page" suffix to route names for better user experience.
   *
   * @type {string}
   */
  const name = `${to.name?.toString()} Page`

  // Show navigation notification
  notifStore.showMessage(name)

  /**
   * Authentication check for protected routes
   *
   * If route requires authentication and user is not logged in,
   * redirect to home page. This prevents unauthorized access to
   * protected features like profile, saved recipes, and search.
   */
  if (requiresAuth && !storedSessionUser.logged_user) {
    // Redirect to home if not authenticated
    return next({ name: 'home' })
  }

  /**
   * Guest-only route check
   *
   * If route is marked as guest-only (like home/about) and user
   * is already logged in, redirect to search page. This prevents
   * logged-in users from accessing landing pages.
   */
  if (to.meta.requiresGuest && storedSessionUser.logged_user) {
    return next('/search') // or redirect to dashboard
  }

  // Continue navigation
  next()
})

export default router
