import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from './types'
import { useUserStore } from './user'
import { useNotifStore } from './notifications'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([])
  const loading = ref(false)
  const search = ref('')
  const error = ref('')
  const searchTerm = ref('')
  const sortAsc = ref(true)

  // User-based saved recipes logic
  const savedRecipes = ref<Recipe[]>([])

  // Get current user
  const userStore = useUserStore()
  const notifStore = useNotifStore()

  // Helper: get storage key for current user
  function getUserStorageKey() {
    const user = userStore.logged_user
    return user && user.uuid ? `savedRecipes_${user.uuid}` : null
  }

  // Load saved recipes for current user
  function loadSavedRecipes() {
    const key = getUserStorageKey()
    if (!key) {
      savedRecipes.value = []
      return
    }
    const saved = localStorage.getItem(key)
    savedRecipes.value = saved ? JSON.parse(saved) : []
  }

  // Save recipes for current user
  function persistSavedRecipes() {
    const key = getUserStorageKey()
    if (!key) return
    localStorage.setItem(key, JSON.stringify(savedRecipes.value))
  }

  // Check if a recipe is already saved by id for current user
  function isRecipeSaved(recipe: Recipe) {
    return savedRecipes.value.some((r) => r.id === recipe.id)
  }

  // Save a recipe for the current user
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

  // Remove a recipe for the current user
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

  function toggleSort() {
    sortAsc.value = !sortAsc.value
  }

  // Watch for user change and reload saved recipes
  userStore.$subscribe(() => {
    loadSavedRecipes()
  })

  loadSavedRecipes()
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

  return {
    recipes,
    loading,
    search,
    error,
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
  }
})
