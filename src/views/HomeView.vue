<template>
  <Hero/>
  <Features/>
  <Testimonials/>
  <Cta/>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import Hero from '@/components/home/hero.vue';
import Features from '@/components/home/features.vue';
import Testimonials from '@/components/home/testimonials.vue';
import Cta from '@/components/home/cta.vue';

onMounted(() => document.title = "JRF | Home")
</script>
