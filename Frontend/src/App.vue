<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/navs/nav.vue';
import Footer from '@/components/footer/footer.vue'
import Modals from '@/components/modal/modal.vue';
import Message from '@/components/notifications/message.vue';
</script>

<template>
  <header>
    <Nav />
  </header>

  <RouterView />
  <Modals />
  <Footer />
  <Message />
</template>