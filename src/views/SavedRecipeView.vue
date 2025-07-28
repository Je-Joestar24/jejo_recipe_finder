<template>
    <div class="saved-container">
        <h1 class="saved-title">Saved Recipes</h1>
        <div class="saved-controls">
            <input v-model="searchTerm" class="saved-search" type="text" placeholder="Search saved recipes..." />
            <button class="saved-sort" @click="toggleSort">
                Sort by Title
                <span :class="{ 'asc': sortAsc, 'desc': !sortAsc }"></span>
            </button>
        </div>
        <ul class="saved-list">
            <transition-group name="list-fade" tag="div">
                <li v-for="recipe in filteredAndSortedRecipes" :key="recipe.id" class="saved-item">
                    <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" class="saved-img" />
                    <div class="saved-info">
                        <h2 class="saved-recipe-title">{{ recipe.title }}</h2>
                        <p class="saved-meta">
                            <span>⏱ {{ recipe.readyInMinutes }} min</span>
                            <span v-if="recipe.servings">🍽 {{ recipe.servings }} servings</span>
                        </p>
                    </div>
                    <div class="saved-actions">
                        <a v-if="recipe.sourceUrl" :href="recipe.sourceUrl" class="saved-view-btn" target="_blank"
                            rel="noopener">View Recipe</a>
                        <button class="saved-remove-btn" @click="remove(recipe.id)">Remove</button>
                    </div>
                </li>
            </transition-group>
            <li v-if="filteredAndSortedRecipes.length === 0" class="saved-empty">No saved recipes found.</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRecipeStore } from '../stores/recipe'
import { storeToRefs } from 'pinia'

const recipeStore = useRecipeStore()
const { savedRecipes } = storeToRefs(recipeStore)
const { removeRecipe, loadSavedRecipes } = recipeStore

const searchTerm = ref('')
const sortAsc = ref(true)

const filteredAndSortedRecipes = computed(() => {
    let filtered = savedRecipes.value.filter(r =>
        r.title.toLowerCase().includes(searchTerm.value.toLowerCase())
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

function remove(id: number) {
    removeRecipe(id)
}

watch(savedRecipes, () => {
    loadSavedRecipes()
})

onMounted(() => document.title = 'JRF | Saved Recipe')
</script>
