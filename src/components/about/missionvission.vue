<template>
  <section class="missionvission" role="region" aria-label="Mission and Vision" tabindex="0">
    <div class="missionvission__cards">
      <article class="missionvission__card missionvission__card--mission" role="article" aria-label="Mission">
        <div class="missionvission__icon" aria-hidden="true">
          <!-- Decorative animated icon for Mission -->
          <svg width="48" height="48" viewBox="0 0 48 48" class="missionvission__svg missionvission__svg--mission">
            <circle cx="24" cy="24" r="20" fill="var(--theme-primary)" opacity="0.12">
              <animate attributeName="r" values="20;23;20" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <path d="M24 10 L28 24 L24 38 L20 24 Z" fill="var(--theme-accent)">
              <animate attributeName="d" values="M24 10 L28 24 L24 38 L20 24 Z;M24 12 L30 24 L24 36 L18 24 Z;M24 10 L28 24 L24 38 L20 24 Z" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        <h3 class="missionvission__title">Mission</h3>
        <p class="missionvission__text">
          To empower home cooks and food enthusiasts with a fast, clean, and personalized recipe experience using smart technology.<br>
          Our mission is to simplify meal planning and discovery, making it enjoyable for everyone—regardless of skill level or dietary preference. By leveraging intelligent search, intuitive design, and seamless saving, we aim to help users cook more confidently, waste less, and rediscover the joy of homemade meals every day.
        </p>
      </article>
      <article class="missionvission__card missionvission__card--vision" role="article" aria-label="Vision">
        <div class="missionvission__icon" aria-hidden="true">
          <!-- Decorative animated icon for Vision -->
          <svg width="48" height="48" viewBox="0 0 48 48" class="missionvission__svg missionvission__svg--vision">
            <ellipse cx="24" cy="24" rx="20" ry="10" fill="var(--theme-secondary)" opacity="0.13">
              <animate attributeName="rx" values="20;23;20" dur="2.8s" repeatCount="indefinite" />
            </ellipse>
            <circle cx="24" cy="24" r="7" fill="var(--theme-accent)" opacity="0.7">
              <animate attributeName="r" values="7;10;7" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <h3 class="missionvission__title">Vision</h3>
        <p class="missionvission__text">
          To become the go-to tool for cooking inspiration—integrating dietary needs, smart shopping lists, and community-driven recommendations in the future.<br>
          Our vision is to foster a vibrant community where users can share, discover, and adapt recipes to their unique lifestyles. We aspire to create a platform that not only inspires creativity in the kitchen but also supports healthy living, collaboration, and a love for food that brings people together.
        </p>
      </article>
    </div>
    <div class="missionvission__decor" aria-hidden="true">
      <!-- Virtual decorative element with micro animation -->
      <svg width="180" height="80" viewBox="0 0 180 80" class="missionvission__wave">
        <path d="M0,40 Q45,10 90,40 T180,40 Q135,70 90,40 T0,40" fill="none" stroke="var(--theme-accent)" stroke-width="4">
          <animate attributeName="d" values="M0,40 Q45,10 90,40 T180,40 Q135,70 90,40 T0,40;M0,40 Q45,20 90,40 T180,40 Q135,60 90,40 T0,40;M0,40 Q45,10 90,40 T180,40 Q135,70 90,40 T0,40" dur="4s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  </section>
</template>