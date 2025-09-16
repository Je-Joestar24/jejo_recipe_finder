<template>
    <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input id="email" v-model="profileData.email" type="email" class="form-input" :disabled="!isEditing"
            :class="{ 'editing': isEditing }" aria-describedby="email-help" />
        <div id="email-help" class="form-help">Your email address</div>
    </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const { isEditing, profileData } = storeToRefs(useProfileStore())
</script>