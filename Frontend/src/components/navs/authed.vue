<template>
    <!-- Navigation Links (unauthenticated) -->
    <ul class="nav__links" role="menubar">
        <li class="nav__item" role="none">
            <router-link class="nav__link" to="/search">Search</router-link>
        </li>
    </ul>
    <div class="right__group">
        <router-link class="nav__saved" aria-label="Saved Recipes" to="/saved">
            <!-- Bookmark SVG -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-7-4-7 4V4z" stroke="var(--min-violet-primary)"
                    stroke-width="2" fill="none" />
            </svg>
        </router-link>
        <div class="nav__profile" tabindex="0" aria-label="Profile Menu">
            <!-- Profile SVG -->
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="10" r="5" stroke="var(--min-violet-primary)" stroke-width="2" fill="none" />
                <ellipse cx="14" cy="20" rx="7" ry="4" stroke="var(--min-violet-accent)" stroke-width="2" fill="none" />
            </svg>
            <div class="nav__profile-dropdown">
                <router-link class="nav__profile-btn" aria-label="Profile" to="/profile">Profile</router-link>
                <button class="nav__profile-btn" aria-label="Logout" @click.prevent="logoutUser">Logout</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { logoutUser } = userStore
</script>