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

import { defineStore } from 'pinia'
import type { Recipe } from '../types/recipe'
//import { useUserStore } from './user'
import { useNotifStore } from './notifications'
import axios from 'axios'
import { useModalStore } from './modals'
import fetchRecipes from '@/services/recipe/fetchRecipes'
import checkFavorites from '@/services/favorites/checkFavorites'
import storeFavorite from '@/services/favorites/storeFavorite'
import deleteFavorite from '@/services/favorites/deleteFavorite'
import fetchFavorites from '@/services/favorites/fetchFavorites'

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
export const useRecipeStore = defineStore('recipe', {
  /**
   * Store state containing recipe data
   * 
   * @type {Object}
   */
  state: () => ({
    /**
     * Search results from API
     *
     * Array of recipes returned from Spoonacular API search.
     * Updated when fetchRecipes is called with search queries.
     *
     * @type {Recipe[]}
     * @default []
     */
    recipes: [] as Recipe[],

    /**
     * Loading state for API operations
     *
     * Indicates whether a recipe search or fetch operation is in progress.
     * Used to show loading indicators in the UI.
     *
     * @type {boolean}
     * @default false
     */
    loading: false,

    /**
     * Search query input
     *
     * Current search term entered by the user.
     * Used for recipe search functionality.
     *
     * @type {string}
     * @default ''
     */
    search: '',

    /**
     * Error message for failed operations
     *
     * Stores error messages from failed API calls or operations.
     * Displayed to users when operations fail.
     *
     * @type {string}
     * @default ''
     */
    error: '',

    /**
     * Search term for saved recipes filtering
     *
     * Used to filter saved recipes by title.
     * Separate from main search for API calls.
     *
     * @type {string}
     * @default ''
     */
    searchTerm: '',

    /**
     * Sort direction for saved recipes
     *
     * Controls the sort order of saved recipes.
     * true = ascending, false = descending
     *
     * @type {boolean}
     * @default true
     */
    sortAsc: true,

    /**
     * Currently active recipe for modal display
     *
     * The recipe currently being displayed in the recipe modal.
     * Set when user clicks on a recipe to view details.
     *
     * @type {Recipe}
     */
    activeRecipe: {
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
    } as Recipe,

    /**
     * User's saved recipes
     *
     * Array of recipes saved by the current user.
     * Stored per user in localStorage and loaded on user login.
     *
     * @type {Recipe[]}
     * @default []
     */
    savedRecipes: [] as Recipe[],
  }),

  /**
   * Store actions for recipe operations
   * 
   * @type {Object}
   */
  actions: {

    /**
     * Load saved recipes for current user
     *
     * Retrieves saved recipes from the API for the current user.
     * Called on store initialization and when user changes.
     *
     * @param {Object} params - Optional parameters for fetching favorites
     * @param {string} params.search - Search query for filtering recipes
     * @param {boolean} params.sortByName - Sort recipes by name
     * @param {number} params.limit - Number of recipes to fetch
     * @param {number} params.page - Page number for pagination
     * @returns {Promise<Array>} Array of saved recipes
     *
     * @example
     * ```typescript
     * const recipes = await loadSavedRecipes()
     * const searchResults = await loadSavedRecipes({ search: 'pasta' })
     * ```
     */
    async loadSavedRecipes(params: {
      search?: string
      sortByName?: boolean
      page?: number
    } = {}): Promise<Recipe[]> {
      try {
        const result = await fetchFavorites(params)
        
        if (result.success && result.data?.data) {
          // Update the savedRecipes state with the fetched data
          this.savedRecipes = result.data.data
          return result.data.data
        } else {
          console.error('Failed to load saved recipes:', result.error)
          return []
        }
      } catch (error) {
        console.error('Error loading saved recipes:', error)
        return []
      }
    },

    /**
     * Check if a recipe is already saved by current user
     *
     * Determines if a recipe is already in the user's saved recipes.
     * Used to prevent duplicate saves and show appropriate UI states.
     *
     * @param {Recipe} recipe - The recipe to check
     * @returns {Promise<boolean>} True if recipe is already saved
     *
     * @example
     * ```typescript
     * const isSaved = await isRecipeSaved(recipe)
     * if (isSaved) {
     *   // Show "Already Saved" state
     * }
     * ```
     */
    async isRecipeSaved(recipe: Recipe): Promise<boolean> {
      try {
        const result = await checkFavorites(recipe.id)
        return result.success && result.data?.is_favorited === true
      } catch (error) {
        console.error('Error checking if recipe is saved:', error)
        return false
      }
    },

    /**
     * Save a recipe for the current user
     *
     * Adds a recipe to the user's saved recipes list.
     * Validates user login status and prevents duplicate saves.
     * Shows appropriate notification messages.
     *
     * @param {Recipe} recipe - The recipe to save
     * @returns {Promise<boolean>} True if save was successful
     *
     * @example
     * ```typescript
     * const success = await saveRecipe(recipe)
     * if (success) {
     *   // Show success message
     * }
     * ```
     */
    async saveRecipe(recipe: Recipe): Promise<boolean> {
      const notifStore = useNotifStore()
      
      try {
        // Check if already saved
        const isAlreadySaved = await this.isRecipeSaved(recipe)
        if (isAlreadySaved) {
          notifStore.showMessage('Recipe already saved.')
          return false
        }

        // Add to favorites
        const result = await storeFavorite(recipe.id)
        
        if (result.success) {
          notifStore.showMessage('Recipe saved successfully!')
          return true
        } else {
          notifStore.showMessage(result.error || 'Failed to save recipe.')
          return false
        }
      } catch (error) {
        console.error('Error saving recipe:', error)
        notifStore.showMessage('Failed to save recipe.')
        return false
      }
    },

    /**
     * Remove a recipe from user's saved recipes
     *
     * Removes a recipe from the user's saved recipes list.
     * Shows appropriate notification messages.
     *
     * @param {number} recipeId - The ID of the recipe to remove
     * @returns {Promise<boolean>} True if removal was successful
     *
     * @example
     * ```typescript
     * const success = await removeRecipe(123)
     * if (success) {
     *   // Show removal confirmation
     * }
     * ```
     */
    async removeRecipe(recipeId: number): Promise<boolean> {
      const notifStore = useNotifStore()
      
      try {
        const result = await deleteFavorite(recipeId)
        
        if (result.success) {
          notifStore.showMessage('Recipe removed from favorites.')
          return true
        } else {
          notifStore.showMessage(result.error || 'Failed to remove recipe.')
          return false
        }
      } catch (error) {
        console.error('Error removing recipe:', error)
        notifStore.showMessage('Failed to remove recipe.')
        return false
      }
    },

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
    toggleSort() {
      this.sortAsc = !this.sortAsc
    },

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
    async fetchRecipes(query?: string) {
      this.loading = true
      this.error = ''

      try {
        const response = await fetchRecipes(query) // pass query down
        if (!response.success) {
          throw new Error(response.error || 'Unknown error')
        }

        const payload = response.data

        // Backend always puts recipes inside `data`
        this.recipes = payload?.data || []
      } catch (e: any) {
        console.error(e)
        this.error = e.message || 'Failed to load recipes.'
        this.recipes = []
      } finally {
        this.loading = false
      }
    },


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
    setActiveRecipe(recipe: Recipe) {
      this.activeRecipe = recipe
      const modalStore = useModalStore()
      modalStore.toggleModal('recipe')
    },

    /**
     * Update search term for saved recipes
     *
     * Updates the search term used for filtering saved recipes.
     *
     * @param {string} term - The search term to filter by
     * 
     * @example
     * ```typescript
     * updateSearchTerm('pasta')
     * ```
     */
    updateSearchTerm(term: string) {
      this.searchTerm = term
    },

    /**
     * Clear search results
     *
     * Clears the current search results and resets search state.
     *
     * @example
     * ```typescript
     * clearSearch()
     * ```
     */
    clearSearch() {
      this.recipes = []
      this.search = ''
      this.error = ''
    },

    /**
     * Clear active recipe
     *
     * Resets the active recipe to default state.
     *
     * @example
     * ```typescript
     * clearActiveRecipe()
     * ```
     */
    clearActiveRecipe() {
      this.activeRecipe = {
        id: 0,
        title: 'No Data',
        image: 'No Data',
        readyInMinutes: 0,
        servings: 0,
        dishTypes: [],
        summary: 'No Data',
        extendedIngredients: [],
        instructions: 'No Data',
        sourceUrl: 'No Data'
      }
    },
  },

  /**
   * Store getters for computed properties
   * 
   * @type {Object}
   */
  getters: {
    /**
     * Get filtered and sorted saved recipes
     *
     * Returns saved recipes filtered by search term and sorted by title.
     * Used for displaying saved recipes with search and sort functionality.
     *
     * @returns {Recipe[]} Filtered and sorted saved recipes
     * 
     * @example
     * ```typescript
     * const filteredRecipes = recipeStore.filteredAndSortedRecipes
     * ```
     */
    filteredAndSortedRecipes(): Recipe[] {
      let filtered = this.savedRecipes.filter((r) =>
        r.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
      filtered = filtered.sort((a, b) => {
        if (this.sortAsc) {
          return a.title.localeCompare(b.title)
        } else {
          return b.title.localeCompare(a.title)
        }
      })
      return filtered
    },

    /**
     * Check if any recipes are loaded
     *
     * @returns {boolean} True if recipes array has items
     * 
     * @example
     * ```typescript
     * const hasRecipes = recipeStore.hasRecipes
     * ```
     */
    hasRecipes(): boolean {
      return this.recipes.length > 0
    },

    /**
     * Check if any saved recipes exist
     *
     * @returns {boolean} True if saved recipes array has items
     * 
     * @example
     * ```typescript
     * const hasSavedRecipes = recipeStore.hasSavedRecipes
     * ```
     */
    hasSavedRecipes(): boolean {
      return this.savedRecipes.length > 0
    },

    /**
     * Get the number of saved recipes
     *
     * @returns {number} Number of saved recipes
     * 
     * @example
     * ```typescript
     * const savedCount = recipeStore.savedRecipesCount
     * ```
     */
    savedRecipesCount(): number {
      return this.savedRecipes.length
    },

    /**
     * Get the number of search results
     *
     * @returns {number} Number of search results
     * 
     * @example
     * ```typescript
     * const resultsCount = recipeStore.searchResultsCount
     * ```
     */
    searchResultsCount(): number {
      return this.recipes.length
    },

    /**
     * Check if active recipe is set
     *
     * @returns {boolean} True if active recipe has valid data
     * 
     * @example
     * ```typescript
     * const hasActiveRecipe = recipeStore.hasActiveRecipe
     * ```
     */
    hasActiveRecipe(): boolean {
      return this.activeRecipe.id !== 0
    },

    /**
     * Check if there's an error
     *
     * @returns {boolean} True if error message exists
     * 
     * @example
     * ```typescript
     * const hasError = recipeStore.hasError
     * ```
     */
    hasError(): boolean {
      return this.error !== ''
    },

    /**
     * Get recipes by cooking time range
     *
     * @param {number} minMinutes - Minimum cooking time
     * @param {number} maxMinutes - Maximum cooking time
     * @returns {Recipe[]} Filtered recipes by cooking time
     * 
     * @example
     * ```typescript
     * const quickRecipes = recipeStore.getRecipesByTime(0, 30)
     * ```
     */
    getRecipesByTime: (state) => (minMinutes: number, maxMinutes: number): Recipe[] => {
      return state.recipes.filter(recipe =>
        recipe.readyInMinutes >= minMinutes && recipe.readyInMinutes <= maxMinutes
      )
    },

    /**
     * Get recipes by dish type
     *
     * @param {string} dishType - The dish type to filter by
     * @returns {Recipe[]} Filtered recipes by dish type
     * 
     * @example
     * ```typescript
     * const mainCourses = recipeStore.getRecipesByDishType('main course')
     * ```
     */
    getRecipesByDishType: (state) => (dishType: string): Recipe[] => {
      return state.recipes.filter(recipe =>
        recipe.dishTypes?.includes(dishType)
      )
    },
  },
})
