<template>
    <section class="search-section" aria-label="Recipe Search">
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
        <div v-if="loading" class="search-loading" aria-live="polite">Loading recipes...</div>
        <div v-else-if="error" class="search-error" aria-live="assertive">{{ error }}</div>
        <div v-else class="search-results" role="list" aria-label="Recipe Results">
            <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card" role="listitem" tabindex="0"
                aria-label="Recipe Card">
                <div class="recipe-card__img-wrapper">
                    <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title + ' image'" class="recipe-card__img"
                        loading="lazy" />
                    <div v-else class="recipe-card__img recipe-card__img--placeholder" aria-label="No image available">
                        <svg width="48" height="48" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--min-violet-bg)"
                                stroke="var(--min-violet-accent)" stroke-width="2" />
                            <path d="M12 36l8-10 6 8 6-6 8 8" stroke="var(--min-violet-primary)" stroke-width="2"
                                fill="none" />
                        </svg>
                    </div>
                </div>
                <div class="recipe-card__body">
                    <h2 class="recipe-card__title">{{ recipe.title }}</h2>
                    <div class="recipe-card__meta">
                        <span class="recipe-card__meta-item">
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <circle cx="8" cy="8" r="7" stroke="var(--min-violet-accent)" stroke-width="2" />
                                <path d="M8 4v4l2.5 2.5" stroke="var(--min-violet-primary)" stroke-width="2"
                                    stroke-linecap="round" />
                            </svg>
                            {{ recipe.readyInMinutes }} min
                        </span>
                        <span v-if="recipe.servings" class="recipe-card__meta-item">
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <ellipse cx="8" cy="10" rx="5" ry="3" stroke="var(--min-violet-primary)"
                                    stroke-width="2" fill="none" />
                            </svg>
                            {{ recipe.servings }} servings
                        </span>
                        <span v-if="recipe.dishTypes && recipe.dishTypes.length" class="recipe-card__meta-item">
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <rect x="3" y="3" width="10" height="10" rx="2" stroke="var(--min-violet-accent)"
                                    stroke-width="2" fill="none" />
                            </svg>
                            {{ recipe.dishTypes[0] }}
                        </span>
                    </div>
                    <div class="recipe-card__actions">
                        <button class="recipe-card__btn" aria-label="View Recipe">View Recipe</button>
                        <button class="recipe-card__btn recipe-card__btn--save" aria-label="Save Recipe">Save
                            Recipe</button>
                    </div>
                </div>
            </div>
            <div v-if="!recipes.length && !loading" class="search-empty" aria-live="polite">No recipes found. Try
                another search!</div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRecipeStore } from '../stores/recipe'
import { storeToRefs } from 'pinia'

const recipeStore = useRecipeStore()
const { recipes, loading, error, search } = storeToRefs(recipeStore)
const { fetchRecipes } = recipeStore

onMounted(() => {
    document.title = "JRF | Search"
    //fetchRecipes();
})

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
