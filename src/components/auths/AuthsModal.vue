<template>
    <LoginModal v-if="modalStore.active == 'login'" />
    <SignupModal v-if="modalStore.active == 'signup'" />
</template>

<script setup lang="ts">
import LoginModal from '@/components/auths/LoginModal.vue';
import SignupModal from '@/components/auths/SignupModal.vue';
import { useModalStore } from '@/stores/modals';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore()
const { active } = storeToRefs(modalStore)
</script>