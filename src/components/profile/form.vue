<template>

    <!-- Profile Form -->
    <form @submit.prevent="saveProfile" class="profile-form">
        <Username />

        <Email />

        <Password />

        <Actions />
    </form>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
import Username from '@/components/profile/username.vue'
import Email from '@/components/profile/email.vue'
import Password from '@/components/profile/password.vue'
import Actions from '@/components/profile/actions.vue'

const { saveProfile } = useProfileStore()
const { isEditing, profileData } = storeToRefs(useProfileStore())
</script>