/**
 * Route Definitions
 *
 * Centralized route configuration for the Jejo Recipe Finder application.
 * This module defines all application routes with their paths, components,
 * and authentication requirements. Uses lazy loading for optimal performance.
 *
 * @module router/routes
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

/**
 * Application routes configuration
 *
 * Array of route objects defining the application's navigation structure.
 * Each route includes path, name, component, and meta information for
 * authentication and access control.
 *
 * Route Types:
 * - Public routes: Accessible to all users (home, about)
 * - Protected routes: Require authentication (profile, saved, search)
 * - Guest-only routes: Only for non-authenticated users
 *
 * @type {RouteRecordRaw[]}
 *
 * @example
 * ```typescript
 * // Navigate to a route
 * router.push('/search')
 * router.push({ name: 'profile' })
 *
 * // Check if route requires auth
 * const requiresAuth = route.meta?.requiresAuth
 * ```
 */
export const routes = [
  /**
   * Home Page Route
   *
   * Landing page accessible to all users. Shows application features,
   * testimonials, and call-to-action for registration/login.
   *
   * @type {RouteRecordRaw}
   * @property {string} path - URL path '/'
   * @property {string} name - Route name 'home'
   * @property {Function} component - Lazy-loaded HomeView component
   * @property {Object} meta - Route metadata
   * @property {boolean} meta.requiresGuest - Only accessible to non-authenticated users
   */
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresGuest: true }, // Only for guests
  },

  /**
   * About Page Route
   *
   * Information page about the application and its features.
   * Accessible to all users but primarily for non-authenticated users.
   *
   * @type {RouteRecordRaw}
   * @property {string} path - URL path '/about'
   * @property {string} name - Route name 'about'
   * @property {Function} component - Lazy-loaded AboutView component
   * @property {Object} meta - Route metadata
   * @property {boolean} meta.requiresGuest - Only accessible to non-authenticated users
   */
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { requiresGuest: true }, // Only for guests
  },

  /**
   * Profile Page Route
   *
   * User profile management page. Allows users to view and edit
   * their profile information, change password, and manage account.
   *
   * @type {RouteRecordRaw}
   * @property {string} path - URL path '/profile'
   * @property {string} name - Route name 'profile'
   * @property {Function} component - Lazy-loaded ProfileView component
   * @property {Object} meta - Route metadata
   * @property {boolean} meta.requiresAuth - Requires user authentication
   */
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }, // Protected
  },

  /**
   * Saved Recipes Page Route
   *
   * User's saved recipes collection page. Shows all recipes saved
   * by the current user with search and filter capabilities.
   *
   * @type {RouteRecordRaw}
   * @property {string} path - URL path '/saved'
   * @property {string} name - Route name 'saved'
   * @property {Function} component - Lazy-loaded SavedRecipeView component
   * @property {Object} meta - Route metadata
   * @property {boolean} meta.requiresAuth - Requires user authentication
   */
  {
    path: '/saved',
    name: 'saved',
    component: () => import('@/views/SavedRecipeView.vue'),
    meta: { requiresAuth: true }, // Protected
  },

  /**
   * Search Recipes Page Route
   *
   * Main recipe search and discovery page. Allows users to search
   * for recipes, view results, and save recipes to their collection.
   *
   * @type {RouteRecordRaw}
   * @property {string} path - URL path '/search'
   * @property {string} name - Route name 'search'
   * @property {Function} component - Lazy-loaded SearchRecipeView component
   * @property {Object} meta - Route metadata
   * @property {boolean} meta.requiresAuth - Requires user authentication
   */
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchRecipeView.vue'),
    meta: { requiresAuth: true }, // Protected
  },
]
