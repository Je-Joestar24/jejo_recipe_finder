<template>
    <div v-if="result" class="signupmodal__message" :class="result?.success ? 'success' : 'error'" aria-live="polite"
        @click.prevent="result = null">
        {{ result?.message }}
    </div>
    <form class="signupmodal__form" autocomplete="off" @submit.prevent="procedSignup">
        <div class="signupmodal__field">
            <label for="signup-email" class="signupmodal__label">Email</label>
            <input id="signup-email" type="email" class="signupmodal__input" v-model="signup.email"
                placeholder="Enter your email" required autocomplete="username" />
        </div>
        <div class="signupmodal__field">
            <label for="signup-fullname" class="signupmodal__label">Full Name</label>
            <input id="signup-fullname" type="text" class="signupmodal__input" v-model="signup.name"
                placeholder="Enter your full name" required autocomplete="name" />
        </div>
        <div class="signupmodal__field">
            <label for="signup-password" class="signupmodal__label">Password</label>
            <input id="signup-password" type="password" class="signupmodal__input" v-model="signup.password"
                placeholder="Create a password" required autocomplete="new-password" />
        </div>
        <div class="signupmodal__field">
            <label for="signup-confirm" class="signupmodal__label">Confirm Password</label>
            <input id="signup-confirm" type="password" class="signupmodal__input" v-model="signup.password_confirmation"
                placeholder="Confirm your password" required autocomplete="new-password" />
        </div>
        <button type="submit" class="signupmodal__button" aria-label="Sign up">Sign Up</button>
    </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modals'
import { ref } from 'vue';
import type { SignupPayload } from '@/types/auth';


const signup = ref<SignupPayload>({
    email: '',
    name: '',
    password: '',
    password_confirmation: ''
})

const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

const result = ref<{ success: boolean; message: string } | null>(null)
const authStore = useAuthStore();
const modalStore = useModalStore();

const { toggleModal } = modalStore
const { signupUser, loginUser } = authStore

const clearForm = () => {
    for (const key in signup.value) {
        if (Object.prototype.hasOwnProperty.call(signup.value, key)) {
            signup.value[key as keyof SignupPayload] = ''
        }
    }
}

const procedSignup = async () => {
    const { email, password } = signup.value
    if (!email || !password) {
        console.error('All fields are required.')
        return
    }

    if (!isValidEmail(email)) {
        result.value = { success: false, message: 'Invalid email format.' }
        return
    }

    if (password !== signup.value.password_confirmation) {
        result.value = { success: false, message: 'Password doesn`t match..' }
        return
    }

    result.value = await signupUser(signup.value)
    if (result.value.success) {
        await loginUser(signup.value.email, signup.value.password)
        clearForm()

        setTimeout(() => {
            toggleModal('')
        }, 500)
    }
}

</script>