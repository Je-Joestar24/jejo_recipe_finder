import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Feature, IconType } from '@/stores/types'

export const useHomeStore = defineStore('home', () => {
  const features: Feature[] = [
    {
      title: 'Smart Search',
      description:
        'Find meals by ingredients, dietary needs, or cravings—instantly and intuitively.',
      icon: 'search',
    },
    {
      title: 'Save Recipes',
      description:
        'One-click save to revisit your favorites anytime, anywhere—no sign-in required.',
      icon: 'save',
    },
    {
      title: 'Detailed Recipes',
      description:
        'Step-by-step instructions, nutrition facts, and tips for perfect results every time.',
      icon: 'details',
    },
    {
      title: 'Free & Fast',
      description: 'No ads, no clutter. Just food—quick, seamless, and always free.',
      icon: 'fast',
    },
  ]
  return { features }
})
