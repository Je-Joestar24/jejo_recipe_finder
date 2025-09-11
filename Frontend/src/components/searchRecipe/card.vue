<template>
    <div :key="id" class="recipe-card" role="listitem" tabindex="0" aria-label="Recipe Card">
        <div class="recipe-card__img-wrapper">
            <img v-if="image" :src="image" :alt="title + ' image'" class="recipe-card__img" loading="lazy" />
            <div v-else class="recipe-card__img recipe-card__img--placeholder" aria-label="No image available">
                <svg width="48" height="48" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <rect x="4" y="4" width="40" height="40" rx="8" fill="var(--min-violet-bg)"
                        stroke="var(--min-violet-accent)" stroke-width="2" />
                    <path d="M12 36l8-10 6 8 6-6 8 8" stroke="var(--min-violet-primary)" stroke-width="2" fill="none" />
                </svg>
            </div>
        </div>
        <div class="recipe-card__body">
            <h2 class="recipe-card__title">{{ title }}</h2>
            <div class="recipe-card__meta">
                <span class="recipe-card__meta-item">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="var(--min-violet-accent)" stroke-width="2" />
                        <path d="M8 4v4l2.5 2.5" stroke="var(--min-violet-primary)" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                    {{ readyInMinutes }} min
                </span>
                <span v-if="servings" class="recipe-card__meta-item">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                        <ellipse cx="8" cy="10" rx="5" ry="3" stroke="var(--min-violet-primary)" stroke-width="2"
                            fill="none" />
                    </svg>
                    {{ servings }} servings
                </span>
                <span v-if="dishTypes && dishTypes.length" class="recipe-card__meta-item">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                        <rect x="3" y="3" width="10" height="10" rx="2" stroke="var(--min-violet-accent)"
                            stroke-width="2" fill="none" />
                    </svg>
                    {{ dishTypes[0] }}
                </span>
            </div>
            <div class="recipe-card__actions">
                <button class="recipe-card__btn" aria-label="View Recipe"
                    @click.prevent="setActiveRecipe(props.payload)">View Recipe</button>
                <button class="recipe-card__btn recipe-card__btn--save" @click.prevent="saveRecipe(props.payload)"
                    aria-label="Save Recipe">Save
                    Recipe</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/stores/types';
import { useRecipeStore } from '@/stores/recipe';
import { onMounted } from 'vue';

const { saveRecipe, setActiveRecipe } = useRecipeStore()

onMounted(() => console.log(typeof setActiveRecipe))

const props = withDefaults(defineProps<{ payload?: Recipe }>(), {
    payload: () => ({
        id: 0,
        title: 'No Data',
        image: 'No Data',
        readyInMinutes: 0,
        servings: 0,
        dishTypes: [],
    })
})

const { id, title, image, readyInMinutes, servings, dishTypes } = props.payload
</script>