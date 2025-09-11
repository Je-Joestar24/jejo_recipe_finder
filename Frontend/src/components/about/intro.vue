<template>
  <section class="intro" role="region" aria-label="About JRF">
    <div class="intro__content">
      <div class="intro__brand" role="img" aria-label="JRF Logo">
        <img src="/src/assets/logo.svg" alt="JRF Logo" class="intro__logo" />
      </div>
      <div class="intro__text">
        <h2 class="intro__title">About JRF</h2>
        <p class="intro__desc">
          JRF is a passionate developer dedicated to building smart, user-friendly web tools that make everyday life easier.<br>
          <strong>Recipe Finder & Saver</strong> is a simple yet powerful app made to help people enjoy cooking without the hassle of disorganized bookmarks or forgotten meals.
        </p>
        <blockquote class="intro__quote" aria-label="Personal quote">
          <span>“Code should empower, not complicate.”</span>
        </blockquote>
        <div class="intro__tech" aria-label="Technologies used">
          <span class="intro__tech-label">Built with:</span>
          <ul class="intro__tech-list">
            <li>Vue 3</li>
            <li>Spoonacular API</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="intro__decor" aria-hidden="true">
      <!-- Decorative animated SVG or div for micro animations -->
      <svg class="intro__svg" viewBox="0 0 200 200" width="200" height="200" aria-label="Decorative abstract shape">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--theme-accent)" stop-opacity="0.8" />
            <stop offset="100%" stop-color="var(--theme-primary)" stop-opacity="0.6" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#grad1)">
          <animate attributeName="r" values="80;90;80" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="100" cy="100" rx="60" ry="30" fill="var(--theme-secondary)" opacity="0.3">
          <animate attributeName="rx" values="60;70;60" dur="2.5s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="150" cy="60" r="12" fill="var(--theme-accent)" opacity="0.7">
          <animate attributeName="cy" values="60;80;60" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  </section>
</template>