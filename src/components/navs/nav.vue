<template>
  <nav class="nav" role="navigation" aria-label="Main Navigation">
    <div class="nav__container">
      <!-- Logo/Brand -->
      <div class="nav__brand" aria-label="Jejo Recipe Finder Home">
        <span class="nav__logo">JRF</span>
      </div>
      <!-- Navigation Links (unauthenticated) -->
      <ul class="nav__links" role="menubar">
        <li class="nav__item" role="none">
          <router-link class="nav__link" to="/">Home</router-link>
        </li>
        <li class="nav__item" role="none">
          <router-link class="nav__link" to="/about">About</router-link>
        </li>
      </ul>
      <!-- Auth Buttons (unauthenticated) -->
      <div class="nav__actions">
        <button class="nav__btn nav__btn--login" aria-label="Login">Login</button>
        <button class="nav__btn nav__btn--signup" aria-label="Sign Up">Sign Up</button>
      </div>
      <!-- Authenticated Nav (hidden for now) -->
      <div class="nav__authed" style="display: none;">
        <button class="nav__search" aria-label="Search Recipe">
          <span class="nav__search-text">Search Recipe</span>
        </button>
        <button class="nav__saved" aria-label="Saved Recipes">
          <!-- Bookmark SVG -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-7-4-7 4V4z" stroke="var(--min-violet-primary)" stroke-width="2" fill="none"/>
          </svg>
        </button>
        <div class="nav__profile" tabindex="0" aria-label="Profile Menu">
          <!-- Profile SVG -->
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="10" r="5" stroke="var(--min-violet-primary)" stroke-width="2" fill="none"/>
            <ellipse cx="14" cy="20" rx="7" ry="4" stroke="var(--min-violet-accent)" stroke-width="2" fill="none"/>
          </svg>
          <div class="nav__profile-dropdown">
            <button class="nav__profile-btn" aria-label="Profile">Profile</button>
            <button class="nav__profile-btn" aria-label="Logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>