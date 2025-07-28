<template>
    <div class="app__message" :class="{ 'fade-out': !message }">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
import { useNotifStore } from '@/stores/notifications';
import { storeToRefs } from 'pinia';

const { message } = storeToRefs(useNotifStore());
</script>