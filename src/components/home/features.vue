<template>
  <section class="features" role="region" aria-label="App Features">
    <div class="features__container">
      <div class="features__col features__col--left">
        <div class="features__icon" aria-hidden="true">
          <!-- Section Icon: Minimalist SVG -->
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="var(--min-violet-primary)" opacity="0.12" />
            <path d="M20 10v20M10 20h20" stroke="var(--min-violet-primary)" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </div>
        <h2 class="features__headline">Improve your recipe discovery today.</h2>
        <p class="features__subtext">Discover, save, and cook delicious meals with smart search, detailed recipes, and a
          clutter-free experience.</p>
      </div>
      <div class="features__col features__col--right" role="list" aria-label="Key Features">
        <div class="features__grid">
          <FeaturesCard v-for="feature of homeStore.features" :payload="feature" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeaturesCard from '@/components/home/featuresCard.vue'
import { useHomeStore } from '@/stores/home'

const homeStore = useHomeStore()
</script>