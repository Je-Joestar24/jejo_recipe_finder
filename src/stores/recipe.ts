import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from './types'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([])
  const loading = ref(false)
  const search = ref('')
  const error = ref('')

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

  return { recipes, loading, search, error, fetchRecipes }
})
