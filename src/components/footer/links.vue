<template>
    <!-- Navigation Links -->
    <ul class="footer__nav" role="menubar">
        <li v-if="!userStore.logged_user"
            v-for="nav of [{ to: '/', display: 'Home' }, { to: '/about', display: 'About' }]" class="footer__nav-item"
            role="none">
            <router-link class="footer__nav-link" :to="nav.to">{{ nav.display }}</router-link>
        </li>
        <li class="footer__nav-item" role="none">
            <a class="footer__nav-link" href="mailto:jpar1252003@email.com" aria-label="Contact Me">Contact Me</a>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>