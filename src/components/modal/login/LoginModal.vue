<template>
  <div class="loginmodal__backdrop" role="dialog" aria-modal="true" aria-label="Login Modal" @click="toggleModal()">
    <div class="loginmodal__modal" tabindex="0" @click.stop>
      <button class="loginmodal__close" aria-label="Close login modal" @click.prevent="toggleModal()">&times;</button>
      <div class="loginmodal__header">
        <h2 class="loginmodal__title">Login</h2>
      </div>
      <LoginForm />
      <div class="loginmodal__footer">
        <span class="loginmodal__signup-text">Don't have an account?</span>
        <a href="#" @click.prevent="toggleModal('signup')" class="loginmodal__signup-link" aria-label="Sign up">Sign
          up</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modals'
import LoginForm from '@/components/modal/login/LoginForm.vue'

const modalStore = useModalStore()
const { toggleModal } = modalStore
</script>