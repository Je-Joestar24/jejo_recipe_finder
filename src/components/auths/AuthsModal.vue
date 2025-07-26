<template>
    <LoginModal v-if="modalStore.active == 'login'"/>
    <SignupModal v-if="modalStore.active == 'signup'"/>
</template>

<script setup lang="ts">
import LoginModal from '@/components/auths/LoginModal.vue';
import SignupModal from '@/components/auths/SignupModal.vue';
import { useModalStore } from '@/stores/modals';

const modalStore = useModalStore()
</script>