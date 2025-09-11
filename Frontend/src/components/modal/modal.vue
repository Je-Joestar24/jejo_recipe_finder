<template>
    <LoginModal v-if="active == 'login'" />
    <SignupModal v-if="active == 'signup'" />
    <RecipeModal v-if="active == 'recipe'" />
</template>

<script setup lang="ts">
import LoginModal from '@/components/modal/login/LoginModal.vue';
import SignupModal from '@/components/modal/signup/SignupModal.vue';
import RecipeModal from '@/components/modal/recipe/RecipeModal.vue';
import { useModalStore } from '@/stores/modals';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore()
const { active } = storeToRefs(modalStore)
</script>