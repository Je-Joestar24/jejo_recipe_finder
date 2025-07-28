<template>
    <section class="search-section" aria-label="Recipe Search">
        <Search />
        <Loading v-if="loading" />
        <Error v-else-if="error" />
        <Result v-else />
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'
import Search from '@/components/searchRecipe/search.vue'
import Loading from '@/components/searchRecipe/loading.vue'
import Error from '@/components/searchRecipe/error.vue'
import Result from '@/components/searchRecipe/result.vue'

const recipeStore = useRecipeStore()
const { loading, error } = storeToRefs(recipeStore)
const { fetchRecipes } = recipeStore

onMounted(() => {
    document.title = "JRF | Search"
    fetchRecipes();
})
</script>
