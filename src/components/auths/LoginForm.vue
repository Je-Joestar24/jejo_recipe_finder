<template>
    <div v-if="result" class="loginmodal__message" :class="result?.success ? 'success' : 'error'" aria-live="polite"
        @click.prevent="result = null">
        {{ result?.message }}
    </div>
    <form class="loginmodal__form" autocomplete="off" @submit.prevent="loginNow">
        <div class="loginmodal__field">
            <label for="login-email" class="loginmodal__label">Email</label>
            <input id="login-email" type="email" v-model="login_form.email" class="loginmodal__input"
                placeholder="Enter your email" required autocomplete="username" />
        </div>
        <div class="loginmodal__field">
            <label for="login-password" class="loginmodal__label">Password</label>
            <input id="login-password" type="password" v-model="login_form.password" class="loginmodal__input"
                placeholder="Enter your password" required autocomplete="current-password" />
        </div>
        <button type="submit" class="loginmodal__button" aria-label="Login">Login</button>
    </form>v
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modals'
import { ref } from 'vue'

const userStore = useUserStore()
const modalStore = useModalStore()
const result = ref<{ success: boolean; message: string } | null>(null)
const login_form = ref({ email: '', password: '' })

const { loginUser } = userStore
const { toggleModal } = modalStore

const clearForm = () => {
    login_form.value.email = ''
    login_form.value.password = ''
}

const loginNow = () => {
    const { email, password } = login_form.value
    if (!email || !password) {
        console.error('All fields are required.')
        return
    }

    result.value = loginUser(login_form.value.email, login_form.value.password)
    if (result.value.success) {
        clearForm()
        setTimeout(() => {
            toggleModal('')
        }, 500)
    }
}
</script>