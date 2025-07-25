<template>
  <section class="features" role="region" aria-label="App Features">
    <div class="features__container">
      <div class="features__col features__col--left">
        <div class="features__icon" aria-hidden="true">
          <!-- Section Icon: Minimalist SVG -->
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="var(--min-violet-primary)" opacity="0.12" />
            <path d="M20 10v20M10 20h20" stroke="var(--min-violet-primary)" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 class="features__headline">Improve your recipe discovery today.</h2>
        <p class="features__subtext">Discover, save, and cook delicious meals with smart search, detailed recipes, and a clutter-free experience.</p>
      </div>
      <div class="features__col features__col--right" role="list" aria-label="Key Features">
        <div class="features__grid">
          <!-- Feature 1 -->
          <div class="feature-card" role="listitem">
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Smart Search Icon -->
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="10" stroke="var(--min-violet-primary)" stroke-width="2" />
                <path d="M21 21l6 6" stroke="var(--min-violet-accent)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Smart Search</h3>
            <p class="feature-card__desc">Find meals by ingredients, dietary needs, or cravings—instantly and intuitively.</p>
          </div>
          <!-- Feature 2 -->
          <div class="feature-card" role="listitem">
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Save Recipes Icon -->
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="7" width="18" height="18" rx="4" stroke="var(--min-violet-primary)" stroke-width="2" />
                <path d="M11 13h10M11 17h6" stroke="var(--min-violet-accent)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Save Recipes</h3>
            <p class="feature-card__desc">One-click save to revisit your favorites anytime, anywhere—no sign-in required.</p>
          </div>
          <!-- Feature 3 -->
          <div class="feature-card" role="listitem">
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Detailed Recipes Icon -->
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="6" width="16" height="20" rx="3" stroke="var(--min-violet-primary)" stroke-width="2" />
                <path d="M12 10h8M12 14h8M12 18h5" stroke="var(--min-violet-accent)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-card__title">Detailed Recipes</h3>
            <p class="feature-card__desc">Step-by-step instructions, nutrition facts, and tips for perfect results every time.</p>
          </div>
          <!-- Feature 4 -->
          <div class="feature-card" role="listitem">
            <div class="feature-card__icon" aria-hidden="true">
              <!-- Free & Fast Icon -->
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="14" width="20" height="8" rx="4" stroke="var(--min-violet-primary)" stroke-width="2" />
                <path d="M10 18h12" stroke="var(--min-violet-accent)" stroke-width="2" stroke-linecap="round"/>
                <circle cx="10" cy="18" r="2" fill="var(--min-violet-accent)" />
                <circle cx="22" cy="18" r="2" fill="var(--min-violet-accent)" />
              </svg>
            </div>
            <h3 class="feature-card__title">Free & Fast</h3>
            <p class="feature-card__desc">No ads, no clutter. Just food—quick, seamless, and always free.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>