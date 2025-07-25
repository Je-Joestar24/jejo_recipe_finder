<template>
  <div class="signupmodal__backdrop" role="dialog" aria-modal="true" aria-label="Signup Modal">
    <div class="signupmodal__modal" tabindex="0">
      <button class="signupmodal__close" aria-label="Close signup modal">&times;</button>
      <div class="signupmodal__header">
        <h2 class="signupmodal__title">Sign Up</h2>
      </div>
      <div class="signupmodal__message" aria-live="polite">
        <!-- Message area for errors or info -->
      </div>
      <form class="signupmodal__form" autocomplete="off">
        <div class="signupmodal__field">
          <label for="signup-email" class="signupmodal__label">Email</label>
          <input id="signup-email" type="email" class="signupmodal__input" placeholder="Enter your email" required autocomplete="username" />
        </div>
        <div class="signupmodal__field">
          <label for="signup-fullname" class="signupmodal__label">Full Name</label>
          <input id="signup-fullname" type="text" class="signupmodal__input" placeholder="Enter your full name" required autocomplete="name" />
        </div>
        <div class="signupmodal__field">
          <label for="signup-password" class="signupmodal__label">Password</label>
          <input id="signup-password" type="password" class="signupmodal__input" placeholder="Create a password" required autocomplete="new-password" />
        </div>
        <div class="signupmodal__field">
          <label for="signup-confirm" class="signupmodal__label">Confirm Password</label>
          <input id="signup-confirm" type="password" class="signupmodal__input" placeholder="Confirm your password" required autocomplete="new-password" />
        </div>
        <button type="submit" class="signupmodal__button" aria-label="Sign up">Sign Up</button>
      </form>
      <div class="signupmodal__footer">
        <span class="signupmodal__login-text">Already have an account?</span>
        <a href="#" class="signupmodal__login-link" aria-label="Login">Login</a>
      </div>
      <div class="signupmodal__decor" aria-hidden="true">
        <!-- Decorative minimal SVG element -->
        <svg width="80" height="40" viewBox="0 0 80 40" class="signupmodal__svg">
          <ellipse cx="40" cy="20" rx="32" ry="12" fill="var(--theme-globe)" opacity="0.5">
            <animate attributeName="rx" values="32;36;32" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="15" cy="30" r="5" fill="var(--theme-primary)" opacity="0.7">
            <animate attributeName="cy" values="30;24;30" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>