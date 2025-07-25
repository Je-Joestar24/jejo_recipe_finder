<template>
  <div class="loginmodal__backdrop" role="dialog" aria-modal="true" aria-label="Login Modal">
    <div class="loginmodal__modal" tabindex="0">
      <button class="loginmodal__close" aria-label="Close login modal">&times;</button>
      <div class="loginmodal__header">
        <h2 class="loginmodal__title">Login</h2>
      </div>
      <div class="loginmodal__message" aria-live="polite">
        <!-- Message area for errors or info -->
      </div>
      <form class="loginmodal__form" autocomplete="off">
        <div class="loginmodal__field">
          <label for="login-email" class="loginmodal__label">Email</label>
          <input id="login-email" type="email" class="loginmodal__input" placeholder="Enter your email" required autocomplete="username" />
        </div>
        <div class="loginmodal__field">
          <label for="login-password" class="loginmodal__label">Password</label>
          <input id="login-password" type="password" class="loginmodal__input" placeholder="Enter your password" required autocomplete="current-password" />
        </div>
        <button type="submit" class="loginmodal__button" aria-label="Login">Login</button>
      </form>
      <div class="loginmodal__footer">
        <span class="loginmodal__signup-text">Don't have an account?</span>
        <a href="#" class="loginmodal__signup-link" aria-label="Sign up">Sign up</a>
      </div>
      <div class="loginmodal__decor" aria-hidden="true">
        <!-- Decorative minimal SVG element -->
        <svg width="80" height="40" viewBox="0 0 80 40" class="loginmodal__svg">
          <ellipse cx="40" cy="20" rx="32" ry="12" fill="var(--theme-globe)" opacity="0.5">
            <animate attributeName="rx" values="32;36;32" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="65" cy="10" r="5" fill="var(--theme-accent)" opacity="0.7">
            <animate attributeName="cy" values="10;16;10" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>