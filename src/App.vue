<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/navs/nav.vue';
import Footer from '@/components/footer/footer.vue'
import AuthsModal from '@/components/auths/AuthsModal.vue';
</script>

<template>
  <header>
    <Nav />
  </header>

  <RouterView />
  <AuthsModal />
  <Footer />
</template>