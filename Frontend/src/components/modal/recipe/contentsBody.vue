<template>
    <div class="recipe-modal__body">
        <figure class="recipe-modal__image-wrapper">
            <img :src="activeRecipe.image" :alt="activeRecipe.title + ' image'" class="recipe-modal__image" />
        </figure>
        <div class="recipe-modal__info">
            <ul class="recipe-modal__meta">
                <li><strong>Ready in:</strong> {{ activeRecipe.readyInMinutes }} min</li>
                <li><strong>Servings:</strong> {{ activeRecipe.servings }}</li>
                <li v-if="activeRecipe.dishTypes && activeRecipe.dishTypes.length">
                    <strong>Type:</strong> {{ activeRecipe.dishTypes.join(', ') }}
                </li>
            </ul>
            <p class="recipe-modal__summary" v-html="activeRecipe.summary"></p>
            <div v-if="activeRecipe.extendedIngredients && activeRecipe.extendedIngredients.length"
                class="recipe-modal__ingredients">
                <h3 class="recipe__title-3">Ingredients</h3>
                <ul>
                    <li v-for="ingredient in activeRecipe.extendedIngredients" :key="ingredient.id">
                        {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
                    </li>
                </ul>
            </div>
            <div v-if="activeRecipe.instructions" class="recipe-modal__instructions">
                <h3 class="recipe__title-3">Instructions</h3>
                <div v-html="activeRecipe.instructions"></div>
            </div>
            <div class="recipe__actions">
                <a v-if="activeRecipe.sourceUrl" :href="activeRecipe.sourceUrl" class="recipe-modal__source"
                    target="_blank" rel="noopener noreferrer" aria-label="View full recipe source">
                    View Full Recipe
                </a>
                <button class="recipe-modal__source recipe-card__btn--save" @click.prevent="saveRecipe(activeRecipe)"
                    aria-label="Save Recipe">Save
                    Recipe</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { storeToRefs } from 'pinia';

const { activeRecipe } = storeToRefs(useRecipeStore())
const { saveRecipe } = useRecipeStore()
</script>