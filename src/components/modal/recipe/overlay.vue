<template>
    <div class="recipe-modal__overlay" @click="toggleModal('')" tabindex="-1" aria-label="Close modal overlay">
    </div>
</template>
<script setup lang="ts">
import { useModalStore } from '@/stores/modals';
const { toggleModal } = useModalStore()
</script>