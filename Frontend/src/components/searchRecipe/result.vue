<template>

    <div class="search-results" role="list" aria-label="Recipe Results">
        <Card v-for="recipe in recipes" :payload="recipe" />
        <div v-if="!recipes.length && !loading" class="search-empty" aria-live="polite">No recipes found. Try
            another search!</div>
    </div>
</template>


<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'
import Card from '@/components/searchRecipe/card.vue'

const recipeStore = useRecipeStore()
const { recipes, loading } = storeToRefs(recipeStore)
</script>
