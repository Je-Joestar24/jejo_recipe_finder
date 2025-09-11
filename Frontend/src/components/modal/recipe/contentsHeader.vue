<template>
    <header class="recipe-modal__header">
        <h2 class="recipe-modal__title">{{ activeRecipe.title }}</h2>
        <button class="recipe-modal__close" @click="toggleModal('')" aria-label="Close recipe modal">&times;</button>
    </header>
</template>
<script setup lang="ts">
import { useModalStore } from '@/stores/modals';
import { useRecipeStore } from '@/stores/recipe';
import { storeToRefs } from 'pinia';

const { toggleModal } = useModalStore()
const { activeRecipe } = storeToRefs(useRecipeStore())
</script>