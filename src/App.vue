<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/navs/nav.vue';
import Footer from '@/components/footer/footer.vue'
</script>

<template>
  <header>
    <Nav/>
  </header>

  <RouterView />

  <Footer/>
</template>