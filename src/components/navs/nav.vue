<template>
  <nav class="nav" role="navigation" aria-label="Main Navigation">
    <div class="nav__container">
      <logo />
      <Unauthed v-if="!userStore.logged_user" />
      <Authed v-else />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Unauthed from '@/components/navs/unauthed.vue'
import Authed from '@/components/navs/authed.vue'
import Logo from './logo.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>