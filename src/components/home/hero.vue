<template>
  <section class="hero" role="region" aria-label="Jejo Recipe Finder Hero">
    <div class="hero__container">
      <div class="hero__col hero__col--left">
        <h1 class="hero__headline" aria-label="Find and Save Recipes Effortlessly">
          Find &amp; Save Your <span class="hero__highlight">Favorite Recipes</span> Effortlessly
        </h1>
        <p class="hero__subtext" aria-label="Explore thousands of delicious meals powered by Spoonacular">
          Explore thousands of delicious meals powered by Spoonacular.
        </p>
        <div class="hero__actions" role="group" aria-label="Hero Actions">
          <button class="hero__btn hero__btn--primary" aria-label="Get Started" tabindex="0">
            Get Started
          </button>
          <button class="hero__btn hero__btn--secondary" aria-label="Try Demo" tabindex="0">
            Try Demo
          </button>
        </div>
      </div>
      <div class="hero__col hero__col--right" aria-hidden="true">
        <!-- Minimalist SVG/virtual element for visual interest -->
        <svg class="hero__visual" width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Decorative abstract illustration">
          <circle cx="130" cy="130" r="100" fill="url(#grad1)" opacity="0.12">
            <animate attributeName="r" values="100;110;100" dur="3s" repeatCount="indefinite" />
          </circle>
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="var(--min-violet-primary)" />
              <stop offset="100%" stop-color="var(--min-violet-accent)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </section>
</template>