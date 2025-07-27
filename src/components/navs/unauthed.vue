<template>
    <!-- Navigation Links (unauthenticated) -->
    <ul class="nav__links" role="menubar">
        <li v-for="nav of [{ to: '/', display: 'Home' }, { to: '/about', display: 'About' }]" class="nav__item"
            role="none">
            <router-link class="nav__link" :to="nav.to">{{ nav.display }}</router-link>
        </li>
    </ul>
    <!-- Auth Buttons (unauthenticated) -->
    <div class="nav__actions">
        <button class="nav__btn nav__btn--login" aria-label="Login"
            @click.prevent="modalStore.toggleModal('login')">Login</button>
        <button class="nav__btn nav__btn--signup" aria-label="Sign Up"
            @click.prevent="modalStore.toggleModal('signup')">Sign Up</button>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useModalStore } from '@/stores/modals';

const modalStore = useModalStore()
</script>