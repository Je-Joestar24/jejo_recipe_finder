<template>
    <div class="saved-container">
        <Header />
        <BodyDisplay />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '@/components/savedRecipe/header.vue'
import BodyDisplay from '@/components/savedRecipe/bodydisplay.vue'

onMounted(() => document.title = 'JRF | Saved Recipe')
</script>
