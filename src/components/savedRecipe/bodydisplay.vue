<template>
    <ul class="saved-list">
        <transition-group name="list-fade" tag="div">
            <ListItem v-for="recipe in filteredAndSortedRecipes" :payload="recipe" />
        </transition-group>
        <Empty v-if="filteredAndSortedRecipes.length === 0" />
    </ul>
</template>
<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'
import Empty from '@/components/savedRecipe/empty.vue'
import ListItem from '@/components/savedRecipe/listitem.vue'

const recipeStore = useRecipeStore()
const { savedRecipes, filteredAndSortedRecipes } = storeToRefs(recipeStore)
const { loadSavedRecipes } = recipeStore

watch(savedRecipes, () => {
    loadSavedRecipes()
})

onMounted(() => document.title = 'JRF | Saved Recipe')
</script>
