<template>
  <section class="testimonials" role="region" aria-label="User Testimonials">
    <div class="testimonials__container">
      <h2 class="testimonials__headline">What Our Users Say</h2>
      <p class="testimonials__subtext">Thousands of food lovers trust Jejo Recipe Finder to discover, save, and cook their favorite meals every day.</p>
      <div class="testimonials__grid" role="list" aria-label="User Reviews">
        <!-- Testimonial 1 -->
        <div class="testimonial-card" role="listitem">
          <div class="testimonial-card__header">
            <span class="testimonial-card__avatar" aria-hidden="true">
              <!-- Virtual SVG Avatar -->
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="var(--min-violet-primary)" opacity="0.18" />
                <circle cx="20" cy="17" r="8" fill="var(--min-violet-accent)" />
                <ellipse cx="20" cy="31" rx="10" ry="5" fill="var(--min-violet-primary)" opacity="0.12" />
              </svg>
            </span>
            <div class="testimonial-card__user">
              <span class="testimonial-card__name">Ava</span>
              <span class="testimonial-card__location">San Francisco</span>
            </div>
            <span class="testimonial-card__stars" aria-label="5 star rating">
              <!-- SVG Stars -->
              <svg width="70" height="14" viewBox="0 0 70 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <polygon v-for="i in 5" :key="i" :points="'7,0 9,5 14,5.5 10.5,9 11.5,14 7,11.5 2.5,14 3.5,9 0,5.5 5,5'" fill="var(--min-violet-accent)" transform="translate((i-1)*14,0)" />
                </g>
              </svg>
            </span>
          </div>
          <p class="testimonial-card__review">“Jejo makes it so easy to find new recipes! I love the clean design and how fast everything loads.”</p>
        </div>
        <!-- Testimonial 2 -->
        <div class="testimonial-card" role="listitem">
          <div class="testimonial-card__header">
            <span class="testimonial-card__avatar" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="var(--min-violet-accent)" opacity="0.18" />
                <circle cx="20" cy="17" r="8" fill="var(--min-violet-primary)" />
                <ellipse cx="20" cy="31" rx="10" ry="5" fill="var(--min-violet-accent)" opacity="0.12" />
              </svg>
            </span>
            <div class="testimonial-card__user">
              <span class="testimonial-card__name">Liam</span>
              <span class="testimonial-card__location">New York</span>
            </div>
            <span class="testimonial-card__stars" aria-label="5 star rating">
              <svg v-for="_ in 4"  width="70" height="14" viewBox="0 0 70 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <polygon :points="'7,0 9,5 14,5.5 10.5,9 11.5,14 7,11.5 2.5,14 3.5,9 0,5.5 5,5'" fill="var(--min-violet-accent)" transform="translate((i-1)*14,0)" />
                </g>
              </svg>
            </span>
          </div>
          <p class="testimonial-card__review">“I’ve saved so many recipes and the step-by-step instructions are super helpful. Highly recommend!”</p>
        </div>
        <!-- Testimonial 3 -->
        <div class="testimonial-card" role="listitem">
          <div class="testimonial-card__header">
            <span class="testimonial-card__avatar" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="var(--min-violet-primary)" opacity="0.18" />
                <circle cx="20" cy="17" r="8" fill="var(--min-violet-accent)" />
                <ellipse cx="20" cy="31" rx="10" ry="5" fill="var(--min-violet-primary)" opacity="0.12" />
              </svg>
            </span>
            <div class="testimonial-card__user">
              <span class="testimonial-card__name">Maya</span>
              <span class="testimonial-card__location">Austin</span>
            </div>
            <span class="testimonial-card__stars" aria-label="5 star rating">
              <svg width="70" height="14" viewBox="0 0 70 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <polygon v-for="i in 5" :key="i" :points="'7,0 9,5 14,5.5 10.5,9 11.5,14 7,11.5 2.5,14 3.5,9 0,5.5 5,5'" fill="var(--min-violet-accent)" transform="translate((i-1)*14,0)" />
                </g>
              </svg>
            </span>
          </div>
          <p class="testimonial-card__review">“The best part? No ads! Just great food and a super easy interface.”</p>
        </div>
        <!-- Testimonial 4 -->
        <div class="testimonial-card" role="listitem">
          <div class="testimonial-card__header">
            <span class="testimonial-card__avatar" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="var(--min-violet-accent)" opacity="0.18" />
                <circle cx="20" cy="17" r="8" fill="var(--min-violet-primary)" />
                <ellipse cx="20" cy="31" rx="10" ry="5" fill="var(--min-violet-accent)" opacity="0.12" />
              </svg>
            </span>
            <div class="testimonial-card__user">
              <span class="testimonial-card__name">Noah</span>
              <span class="testimonial-card__location">Chicago</span>
            </div>
            <span class="testimonial-card__stars" aria-label="5 star rating">
              <svg width="70" height="14" viewBox="0 0 70 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <polygon v-for="i in 5" :key="i" :points="'7,0 9,5 14,5.5 10.5,9 11.5,14 7,11.5 2.5,14 3.5,9 0,5.5 5,5'" fill="var(--min-violet-accent)" transform="translate((i-1)*14,0)" />
                </g>
              </svg>
            </span>
          </div>
          <p class="testimonial-card__review">“I use Jejo every week. The search is smart and the recipes are always spot on!”</p>
        </div>
      </div>
      <div class="testimonials__meta">
        <span class="testimonials__users-count">10,000+ users saving recipes daily</span>
      </div>
    </div>
  </section>
</template>