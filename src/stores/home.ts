import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Feature, Reviewer } from '@/stores/types'

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

  const testimonials: Reviewer[] = [
    {
      name: 'Ava',
      address: 'San Francisco',
      message: `JRF makes it so easy to find new recipes! I love the clean design and how fast everything loads.`,
      stars: 5,
    },
    {
      name: 'Liam',
      address: 'New York',
      message: `I’ve saved so many recipes and the step-by-step instructions are super helpful. Highly recommend!`,
      stars: 5,
    },
    {
      name: 'Maya',
      address: 'Austin',
      message: `The best part? No ads! Just great food and a super easy interface.`,
      stars: 5,
    },
    {
      name: 'Noah',
      address: 'Chicago',
      message: `I use JRF every week. The search is smart and the recipes are always spot on!`,
      stars: 5,
    },
  ]
  return { features, testimonials }
})
