<template>
    <h1 class="saved-title">Saved Recipes</h1>
    <div class="saved-controls">
        <input v-model="searchTerm" class="saved-search" type="text" placeholder="Search saved recipes..." />
        <button class="saved-sort" @click="toggleSort">
            Sort by Title
            <span :class="{ 'asc': sortAsc, 'desc': !sortAsc }"></span>
        </button>
    </div>
</template>
<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'

const recipeStore = useRecipeStore()
const { searchTerm, sortAsc } = storeToRefs(recipeStore)
const { toggleSort } = recipeStore
</script>