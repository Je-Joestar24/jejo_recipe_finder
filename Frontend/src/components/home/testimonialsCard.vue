<template>
    <div class="testimonial-card" role="listitem">
        <div class="testimonial-card__header">
            <span class="testimonial-card__avatar" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="var(--min-violet-accent)" opacity="0.18" />
                    <circle cx="20" cy="17" r="8" fill="var(--min-violet-primary)" />
                    <ellipse cx="20" cy="31" rx="10" ry="5" fill="var(--min-violet-accent)" opacity="0.12" />
                </svg>
            </span>
            <div class="testimonial-card__user">
                <span class="testimonial-card__name">{{ name || 'No data' }}</span>
                <span class="testimonial-card__location">{{ address || 'No data' }}</span>
            </div>
            <span class="testimonial-card__stars" aria-label="star rating">
                <svg v-for="(_, i) in stars" :key="i" width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <polygon points="7,0 9,5 14,5.5 10.5,9 11.5,14 7,11.5 2.5,14 3.5,9 0,5.5 5,5"
                        fill="var(--min-violet-accent)" />
                </svg>
            </span>
        </div>
        <p class="testimonial-card__review">“{{ message || "No Data" }}”</p>
    </div>
</template>

<script setup lang="ts">
import type { Reviewer } from '@/stores/types'

const props = withDefaults(defineProps<{ payload?: Reviewer }>(), {
    payload: () => ({
        name: '',
        address: '',
        message: '',
        stars: 0
    })
})

const { name, address, message, stars } = props.payload
</script>