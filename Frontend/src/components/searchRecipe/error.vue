<template>
    <div class="search-error" aria-live="assertive">{{ error }}</div>
</template>
<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'

const recipeStore = useRecipeStore()
const { error } = storeToRefs(recipeStore)
</script>