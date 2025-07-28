<template>
    <li :key="id" class="saved-item">
        <img v-if="image" :src="image" :alt="title" class="saved-img" />
        <div class="saved-info">
            <h2 class="saved-recipe-title">{{ title }}</h2>
            <p class="saved-meta">
                <span>⏱ {{ readyInMinutes }} min</span>
                <span v-if="servings">🍽 {{ servings }} servings</span>
            </p>
        </div>
        <div class="saved-actions">
            <a v-if="sourceUrl" :href="sourceUrl" class="saved-view-btn" target="_blank" rel="noopener">View
                Recipe</a>
            <button class="saved-remove-btn" @click="remove(id)">Remove</button>
        </div>
    </li>
</template>
<script setup lang="ts">
import type { Recipe } from '@/stores/types';
import { useRecipeStore } from '@/stores/recipe';

const { removeRecipe } = useRecipeStore()

function remove(id: number) {
    removeRecipe(id)
}

const props = withDefaults(defineProps<{ payload?: Recipe }>(), {
    payload: () => ({
        id: 0,
        title: 'No Data',
        image: 'No Data',
        readyInMinutes: 0,
        servings: 0,
        dishTypes: [],
        sourceUrl: 'No Data'
    })
})

const { id, title, image, readyInMinutes, servings, dishTypes, sourceUrl } = props.payload
</script>