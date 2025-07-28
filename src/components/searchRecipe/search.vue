<template>
    <form class="search-bar" @submit.prevent="onSearch" role="search" aria-label="Search Recipes">
        <input v-model="search" class="search-bar__input" type="text" placeholder="Search for recipes..."
            aria-label="Search for recipes" autocomplete="off" />
        <button class="search-bar__btn" type="submit" aria-label="Search">
            <span class="visually-hidden">Search</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" stroke="var(--min-violet-primary)" stroke-width="2" />
                <line x1="18" y1="18" x2="22" y2="22" stroke="var(--min-violet-accent)" stroke-width="2"
                    stroke-linecap="round" />
            </svg>
        </button>
    </form>
</template>


<script setup lang="ts">
import { watch } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'

const recipeStore = useRecipeStore()
const { search } = storeToRefs(recipeStore)
const { fetchRecipes } = recipeStore

function onSearch() {
    if (search.value) fetchRecipes(search.value)
}

let debounceTimer: ReturnType<typeof setTimeout>

watch(search, (searchTerm) => {
    clearTimeout(debounceTimer) // Clear previous timer

    if (searchTerm && searchTerm.trim() !== '') {
        debounceTimer = setTimeout(() => {
            fetchRecipes(searchTerm)
        }, 1000) // Wait 1 second
    }
})
</script>
