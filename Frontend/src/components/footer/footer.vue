<template>
  <footer class="footer" role="contentinfo" aria-label="Site Footer">
    <div class="footer__container">
      <!-- Logo -->
      <Logo />
      <Links />
      <socials />
      <!-- Virtual Element: Animated Glow -->
      <div class="footer__glow" aria-hidden="true"></div>
    </div>
    <Copyright />
  </footer>
</template>

<script setup lang="ts">
import Links from '@/components/footer/links.vue'
import Socials from '@/components/footer/socials.vue'
import Logo from '@/components/footer/logo.vue'
import Copyright from '@/components/footer/copyright.vue'
</script>