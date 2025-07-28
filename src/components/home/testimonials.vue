<template>
  <section class="testimonials" role="region" aria-label="User Testimonials">
    <div class="testimonials__container">
      <h2 class="testimonials__headline">What Our Users Say</h2>
      <p class="testimonials__subtext">Thousands of food lovers trust Jejo Recipe Finder to discover, save, and cook
        their favorite meals every day.</p>
      <div class="testimonials__grid" role="list" aria-label="User Reviews">

        <TestimonialsCard v-for="reviewer of testimonials" :payload="reviewer" />
      </div>
      <div class="testimonials__meta">
        <span class="testimonials__users-count">10,000+ users saving recipes daily</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TestimonialsCard from '@/components/home/testimonialsCard.vue';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore()
const { testimonials } = homeStore
</script>