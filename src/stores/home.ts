/**
 * Home Store
 *
 * Manages static content and data for the home page including features and testimonials.
 * This store provides centralized access to marketing content and user testimonials
 * that are displayed on the landing page.
 *
 * @module stores/home
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Feature, Reviewer } from '@/stores/types'

/**
 * Home Store - Manages home page content and testimonials
 *
 * This store contains static data for the home page including:
 * - Feature highlights with icons and descriptions
 * - User testimonials with ratings and locations
 *
 * The data is structured to support the home page components
 * and provide a consistent user experience.
 */
export const useHomeStore = defineStore('home', () => {
  /**
   * Feature highlights for the home page
   *
   * Array of features that showcase the application's key capabilities.
   * Each feature includes a title, description, and associated icon.
   * Used by the Features component to display service highlights.
   *
   * @type {Feature[]}
   * @readonly
   */
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

  /**
   * User testimonials for social proof
   *
   * Array of user testimonials with ratings and location information.
   * Used by the Testimonials component to build trust and credibility.
   * Each testimonial includes user name, location, message, and star rating.
   *
   * @type {Reviewer[]}
   * @readonly
   */
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
      message: `I've saved so many recipes and the step-by-step instructions are super helpful. Highly recommend!`,
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
