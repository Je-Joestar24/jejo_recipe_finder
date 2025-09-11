<template>
    <!-- Logo/Brand -->
    <div class="nav__brand" aria-label="Jejo Recipe Finder Home">
        <span class="nav__logo" @click.prevent="showMessage('Yawa');">JRF</span>
    </div>
</template>

<script setup lang="ts">
import { useNotifStore } from '@/stores/notifications';

const { showMessage } = useNotifStore();
</script>