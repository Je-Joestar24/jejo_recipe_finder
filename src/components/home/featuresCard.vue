<template>
    <div class="feature-card" role="listitem">
        <!-- Conditionally render icon -->
        <div v-if="payload.icon && components[payload.icon]" class="feature-card__icon" aria-hidden="true">
            <component :is="components[payload.icon]" />
        </div>
        <h3 class="feature-card__title">{{ payload.title || 'No Title' }}</h3>
        <p class="feature-card__desc">{{ payload.description || 'No Description' }}</p>
    </div>
</template>

<script setup lang="ts">
import FeatureSearch from '@/components/icons/featureSearch.vue'
import FeatureSave from '@/components/icons/featureSave.vue'
import FeatureDetails from '@/components/icons/featureDetails.vue'
import FeatureFreeFast from '@/components/icons/featureFreeFast.vue'
import type { Feature, IconType } from '@/stores/types'

// 4. Dynamic component map
const components: Record<IconType, any> = {
    search: FeatureSearch,
    save: FeatureSave,
    details: FeatureDetails,
    fast: FeatureFreeFast
}

// 5. Props with default values
const props = withDefaults(defineProps<{ payload?: Feature }>(), {
    payload: () => ({
        title: '',
        description: '',
        icon: undefined
    })
})
</script>