/**
 * Recipe Store
 *
 * Manages recipe data, search functionality, and user-saved recipes.
 * This store handles API integration with Spoonacular, recipe search,
 * saved recipes management, and modal state for recipe details.
 *
 * @module stores/recipe
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from './types'
import { useUserStore } from './user'
import { useNotifStore } from './notifications'
import axios from 'axios'
import { useModalStore } from './modals'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

/**
 * Recipe Store - Recipe management and API integration
 *
 * Provides comprehensive recipe functionality including:
 * - Recipe search and API integration
 * - User-specific saved recipes management
 * - Recipe modal state management
 * - Search filtering and sorting
 *
 * Features:
 * - Spoonacular API integration
 * - User-based recipe saving
 * - Search and filter functionality
 * - Modal state management
 * - Local storage persistence
 *
 * @example
 * ```typescript
 * const recipeStore = useRecipeStore()
 * await recipeStore.fetchRecipes('pasta') // Search recipes
 * recipeStore.saveRecipe(recipe) // Save a recipe
 * recipeStore.setActiveRecipe(recipe) // Open recipe modal
 * ```
 */
export const useRecipeStore = defineStore('recipe', () => {
  /**
   * Search results from API
   *
   * Array of recipes returned from Spoonacular API search.
   * Updated when fetchRecipes is called with search queries.
   *
   * @type {Ref<Recipe[]>}
   * @default []
   */
  const recipes = ref<Recipe[]>([])

  /**
   * Loading state for API operations
   *
   * Indicates whether a recipe search or fetch operation is in progress.
   * Used to show loading indicators in the UI.
   *
   * @type {Ref<boolean>}
   * @default false
   */
  const loading = ref(false)

  /**
   * Search query input
   *
   * Current search term entered by the user.
   * Used for recipe search functionality.
   *
   * @type {Ref<string>}
   * @default ''
   */
  const search = ref('')

  /**
   * Error message for failed operations
   *
   * Stores error messages from failed API calls or operations.
   * Displayed to users when operations fail.
   *
   * @type {Ref<string>}
   * @default ''
   */
  const error = ref('')

  /**
   * Search term for saved recipes filtering
   *
   * Used to filter saved recipes by title.
   * Separate from main search for API calls.
   *
   * @type {Ref<string>}
   * @default ''
   */
  const searchTerm = ref('')

  /**
   * Sort direction for saved recipes
   *
   * Controls the sort order of saved recipes.
   * true = ascending, false = descending
   *
   * @type {Ref<boolean>}
   * @default true
   */
  const sortAsc = ref(true)

  /**
   * Currently active recipe for modal display
   *
   * The recipe currently being displayed in the recipe modal.
   * Set when user clicks on a recipe to view details.
   *
   * @type {Ref<Recipe>}
   */
  const activeRecipe = ref<Recipe>({
    id: 0,
    title: 'No Data',
    image: 'No Data',
    readyInMinutes: 0,
    servings: 0,
    dishTypes: [],
    summary: 'No Data',
    extendedIngredients: [],
    instructions: 'No Data',
    sourceUrl: 'No Data',
    savedBy: 'No Data',
  })

  /**
   * User's saved recipes
   *
   * Array of recipes saved by the current user.
   * Stored per user in localStorage and loaded on user login.
   *
   * @type {Ref<Recipe[]>}
   * @default []
   */
  const savedRecipes = ref<Recipe[]>([])

  // Get current user
  const userStore = useUserStore()
  const notifStore = useNotifStore()
  const modalStore = useModalStore()

  /**
   * Generate storage key for current user's saved recipes
   *
   * Creates a unique key for localStorage based on user UUID.
   * Returns null if no user is logged in.
   *
   * @private
   * @returns {string | null} Storage key for current user's recipes
   */
  function getUserStorageKey() {
    const user = userStore.logged_user
    return user && user.uuid ? `savedRecipes_${user.uuid}` : null
  }

  /**
   * Load saved recipes for current user
   *
   * Retrieves saved recipes from localStorage for the current user.
   * Called on store initialization and when user changes.
   *
   * @private
   */
  function loadSavedRecipes() {
    const key = getUserStorageKey()
    if (!key) {
      savedRecipes.value = []
      return
    }
    const saved = localStorage.getItem(key)
    savedRecipes.value = saved ? JSON.parse(saved) : []
  }

  /**
   * Persist saved recipes to localStorage
   *
   * Saves the current saved recipes array to localStorage.
   * Called whenever saved recipes are modified.
   *
   * @private
   */
  function persistSavedRecipes() {
    const key = getUserStorageKey()
    if (!key) return
    localStorage.setItem(key, JSON.stringify(savedRecipes.value))
  }

  /**
   * Check if a recipe is already saved by current user
   *
   * Determines if a recipe is already in the user's saved recipes.
   * Used to prevent duplicate saves and show appropriate UI states.
   *
   * @param {Recipe} recipe - The recipe to check
   * @returns {boolean} True if recipe is already saved
   *
   * @example
   * ```typescript
   * const isSaved = isRecipeSaved(recipe)
   * if (isSaved) {
   *   // Show "Already Saved" state
   * }
   * ```
   */
  function isRecipeSaved(recipe: Recipe) {
    return savedRecipes.value.some((r) => r.id === recipe.id)
  }

  /**
   * Save a recipe for the current user
   *
   * Adds a recipe to the user's saved recipes list.
   * Validates user login status and prevents duplicate saves.
   * Shows appropriate notification messages.
   *
   * @param {Recipe} recipe - The recipe to save
   * @returns {boolean} True if save was successful
   *
   * @example
   * ```typescript
   * const success = saveRecipe(recipe)
   * if (success) {
   *   // Show success message
   * }
   * ```
   */
  function saveRecipe(recipe: Recipe) {
    const user = userStore.logged_user
    if (!user || !user.uuid) {
      notifStore.showMessage('You must be logged in to save recipes.')
      return false
    }
    if (isRecipeSaved(recipe)) {
      notifStore.showMessage('Recipe already saved.')
      return false
    }
    // Attach user id to recipe
    const recipeToSave = { ...recipe, savedBy: user.uuid }
    savedRecipes.value.push(recipeToSave)
    persistSavedRecipes()
    notifStore.showMessage('Recipe saved successfully!')
    return true
  }

  /**
   * Remove a recipe from user's saved recipes
   *
   * Removes a recipe from the user's saved recipes list.
   * Shows appropriate notification messages.
   *
   * @param {number} recipeId - The ID of the recipe to remove
   * @returns {boolean} True if removal was successful
   *
   * @example
   * ```typescript
   * const success = removeRecipe(123)
   * if (success) {
   *   // Show removal confirmation
   * }
   * ```
   */
  function removeRecipe(recipeId: number) {
    const idx = savedRecipes.value.findIndex((r) => r.id === recipeId)
    if (idx !== -1) {
      savedRecipes.value.splice(idx, 1)
      persistSavedRecipes()
      notifStore.showMessage('Recipe removed.')
      return true
    }
    notifStore.showMessage('Recipe not found.')
    return false
  }

  /**
   * Computed filtered and sorted saved recipes
   *
   * Returns saved recipes filtered by search term and sorted by title.
   * Used for displaying saved recipes with search and sort functionality.
   *
   * @type {ComputedRef<Recipe[]>}
   * @returns {Recipe[]} Filtered and sorted saved recipes
   */
  const filteredAndSortedRecipes = computed(() => {
    let filtered = savedRecipes.value.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
    filtered = filtered.sort((a, b) => {
      if (sortAsc.value) {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })
    return filtered
  })

  /**
   * Toggle sort direction for saved recipes
   *
   * Switches between ascending and descending sort order.
   * Used for sorting saved recipes by title.
   *
   * @example
   * ```typescript
   * toggleSort() // Switch between A-Z and Z-A
   * ```
   */
  function toggleSort() {
    sortAsc.value = !sortAsc.value
  }

  // Watch for user change and reload saved recipes
  userStore.$subscribe(() => {
    loadSavedRecipes()
  })

  loadSavedRecipes()

  /**
   * Fetch recipes from Spoonacular API
   *
   * Retrieves recipes from the Spoonacular API based on search query.
   * Supports both search queries and random recipe fetching.
   * Updates loading state and handles errors appropriately.
   *
   * @async
   * @param {string} [query] - Search query for recipes (optional for random recipes)
   *
   * @example
   * ```typescript
   * await fetchRecipes('pasta') // Search for pasta recipes
   * await fetchRecipes() // Get random recipes
   * ```
   */
  async function fetchRecipes(query?: string) {
    loading.value = true
    error.value = ''

    try {
      let url = ''
      let params: Record<string, string | number> = {
        number: 10,
        apiKey: API_KEY,
      }
      if (query) {
        url = `${BASE_URL}/complexSearch`
        params.query = query
        params.addRecipeInformation = 'true'
      } else {
        url = `${BASE_URL}/random`
      }

      const response = await axios.get(url, { params })
      const data = response.data

      if (data.results) {
        recipes.value = data.results
      } else if (data.recipes) {
        recipes.value = data.recipes
      } else {
        recipes.value = []
      }
    } catch (e) {
      console.error(e)
      error.value = 'Failed to load recipes.'
      recipes.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Set active recipe and open modal
   *
   * Sets the active recipe for modal display and opens the recipe modal.
   * Used when user clicks on a recipe to view its details.
   *
   * @param {Recipe} recipe - The recipe to display in modal
   *
   * @example
   * ```typescript
   * setActiveRecipe(recipe) // Open recipe modal with details
   * ```
   */
  function setActiveRecipe(recipe: Recipe) {
    activeRecipe.value = recipe
    modalStore.toggleModal('recipe')
    return
  }

  return {
    recipes,
    loading,
    search,
    error,
    activeRecipe,
    fetchRecipes,
    // Saved recipes
    savedRecipes,
    saveRecipe,
    removeRecipe,
    isRecipeSaved,
    loadSavedRecipes,
    searchTerm,
    sortAsc,
    filteredAndSortedRecipes,
    toggleSort,
    setActiveRecipe,
  }
})
