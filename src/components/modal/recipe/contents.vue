<template>
    <section class="recipe-modal__content" tabindex="0">
        <ContentsHeader />
        <ContentsBody />
    </section>
</template>
<script setup lang="ts">
import ContentsHeader from '@/components/modal/recipe/contentsHeader.vue'
import ContentsBody from '@/components/modal/recipe/contentsBody.vue'
</script>