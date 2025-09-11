<template>
    <div class="recipe-modal" role="dialog" aria-modal="true" aria-label="Recipe Details">
        <Overlay />
        <Contents />
    </div>
</template>

<script setup lang="ts">
import Overlay from '@/components/modal/recipe/overlay.vue';
import Contents from '@/components/modal/recipe/contents.vue';
</script>