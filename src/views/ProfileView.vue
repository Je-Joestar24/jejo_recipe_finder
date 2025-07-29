<template>
    <div class="profile-container">
        <Container />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Container from '@/components/profile/container.vue';

onMounted(() => document.title = "JRF | Profile");
</script>
