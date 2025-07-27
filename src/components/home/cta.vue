<template>
  <section class="cta" role="region" aria-label="Call to Action">
    <div class="cta__container">
      <div class="cta__content">
        <h2 class="cta__headline">Ready to discover your next favorite dish?</h2>
        <p class="cta__subtext">No credit card. Just delicious recipes.</p>
        <button class="cta__btn" @click.prevent="modalStore.toggleModal('signup')" aria-label="Sign Up Free">Sign Up
          Free</button>
      </div>
      <div class="cta__visual" aria-hidden="true">
        <!-- Minimalist animated SVG ring -->
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="cta__ring">
          <circle cx="110" cy="110" r="90" stroke="var(--min-violet-primary)" stroke-width="8" opacity="0.13" />
          <circle cx="110" cy="110" r="70" stroke="var(--min-violet-accent)" stroke-width="4" opacity="0.18" />
          <circle cx="110" cy="110" r="100" stroke="var(--min-violet-accent)" stroke-width="2" opacity="0.09" />
        </svg>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useModalStore } from '@/stores/modals';

const modalStore = useModalStore()
</script>