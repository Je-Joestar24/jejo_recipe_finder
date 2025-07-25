<template>
  <footer class="footer" role="contentinfo" aria-label="Site Footer">
    <div class="footer__container">
      <!-- Logo -->
      <div class="footer__brand" aria-label="Jejo Recipe Finder Home">
        <span class="footer__logo">JRF</span>
      </div>
      <!-- Navigation Links -->
      <ul class="footer__nav" role="menubar">
        <li class="footer__nav-item" role="none">
          <router-link class="footer__nav-link" to="/">Home</router-link>
        </li>
        <li class="footer__nav-item" role="none">
          <router-link class="footer__nav-link" to="/about">About</router-link>
        </li>
        <li class="footer__nav-item" role="none">
          <a class="footer__nav-link" href="mailto:your@email.com" aria-label="Contact Me">Contact Me</a>
        </li>
      </ul>
      <!-- Socials -->
      <div class="footer__socials" aria-label="Social Links">
        <a href="https://github.com/" target="_blank" rel="noopener" class="footer__social-link" aria-label="GitHub">
          <!-- GitHub SVG -->
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" fill="var(--min-violet-text-light)"/></svg>
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener" class="footer__social-link" aria-label="Facebook">
          <!-- Facebook SVG -->
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12Z" fill="var(--min-violet-text-light)"/></svg>
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener" class="footer__social-link" aria-label="LinkedIn">
          <!-- LinkedIn SVG -->
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" fill="var(--min-violet-text-light)"/></svg>
        </a>
      </div>
      <!-- Virtual Element: Animated Glow -->
      <div class="footer__glow" aria-hidden="true"></div>
    </div>
    <div class="footer__copyright">
      &copy; {{ new Date().getFullYear() }} Jejo Recipe Finder. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>