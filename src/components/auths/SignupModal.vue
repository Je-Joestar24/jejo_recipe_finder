<template>
  <div class="signupmodal__backdrop" role="dialog" aria-modal="true" aria-label="Signup Modal"
    @click="modalStore.toggleModal()">
    <div class="signupmodal__modal" tabindex="0" @click.stop>
      <button class="signupmodal__close" aria-label="Close signup modal"
        @click="modalStore.toggleModal()">&times;</button>
      <div class="signupmodal__header">
        <h2 class="signupmodal__title">Sign Up</h2>
      </div>
      <SignupForm />
      <div class="signupmodal__footer">
        <span class="signupmodal__login-text">Already have an account?</span>
        <a href="#" class="signupmodal__login-link" aria-label="Login"
          @click.prevent="modalStore.toggleModal('login')">Login</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modals';
import SignupForm from '@/components/auths/SignupForm.vue';

const modalStore = useModalStore()
</script>