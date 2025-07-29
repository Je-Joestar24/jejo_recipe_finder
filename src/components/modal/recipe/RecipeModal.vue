<template>
    <div class="recipe-modal" role="dialog" aria-modal="true" aria-label="Recipe Details">
        <div class="recipe-modal__overlay" @click="toggleModal('')" tabindex="-1" aria-label="Close modal overlay">
        </div>
        <section class="recipe-modal__content" tabindex="0">
            <header class="recipe-modal__header">
                <h2 class="recipe-modal__title">{{ activeRecipe.title }}</h2>
                <button class="recipe-modal__close" @click="toggleModal('')"
                    aria-label="Close recipe modal">&times;</button>
            </header>
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
                    <a v-if="activeRecipe.sourceUrl" :href="activeRecipe.sourceUrl" class="recipe-modal__source"
                        target="_blank" rel="noopener noreferrer" aria-label="View full recipe source">
                        View Full Recipe
                    </a>
                </div>
            </div>
        </section>
        <!-- Decorative virtual element -->
        <div class="recipe-modal__virtual-deco" aria-hidden="true"></div>
    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modals';
import { useRecipeStore } from '@/stores/recipe';
import { storeToRefs } from 'pinia';

const { toggleModal } = useModalStore()
const { activeRecipe } = storeToRefs(useRecipeStore())
</script>