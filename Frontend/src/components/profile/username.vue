<template>
    <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input id="username" v-model="profileData.name" type="text" class="form-input" :disabled="!isEditing"
            :class="{ 'editing': isEditing }" aria-describedby="username-help" />
        <div id="username-help" class="form-help">Your display name</div>
    </div>
</template>
<script setup lang="ts">
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
const { isEditing, profileData } = storeToRefs(useProfileStore())
</script>