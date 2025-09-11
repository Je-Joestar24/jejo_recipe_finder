<template>
    <div class="profile-container">
        <Container />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Container from '@/components/profile/container.vue';
import { useProfileStore } from '@/stores/profile';

onMounted(() => {
    document.title = "JRF | Profile"
    const { initializeProfile } = useProfileStore()
    initializeProfile()
});
</script>
