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
export const useHomeStore = defineStore('home', {
  /**
   * Store state containing static data
   * 
   * @type {Object}
   */
  state: () => ({
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
    features: [
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
    ] as Feature[],

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
    testimonials: [
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
    ] as Reviewer[],
  }),

  /**
   * Store actions for data manipulation
   * 
   * @type {Object}
   */
  actions: {
    /**
     * Get all features for the home page
     * 
     * @returns {Feature[]} Array of feature objects
     * 
     * @example
     * ```typescript
     * const features = homeStore.getFeatures()
     * ```
     */
    getFeatures(): Feature[] {
      return this.features
    },

    /**
     * Get all testimonials for the home page
     * 
     * @returns {Reviewer[]} Array of testimonial objects
     * 
     * @example
     * ```typescript
     * const testimonials = homeStore.getTestimonials()
     * ```
     */
    getTestimonials(): Reviewer[] {
      return this.testimonials
    },

    /**
     * Get a specific feature by index
     * 
     * @param {number} index - Index of the feature to retrieve
     * @returns {Feature | undefined} Feature object or undefined if not found
     * 
     * @example
     * ```typescript
     * const feature = homeStore.getFeatureByIndex(0)
     * ```
     */
    getFeatureByIndex(index: number): Feature | undefined {
      return this.features[index]
    },

    /**
     * Get a specific testimonial by index
     * 
     * @param {number} index - Index of the testimonial to retrieve
     * @returns {Reviewer | undefined} Testimonial object or undefined if not found
     * 
     * @example
     * ```typescript
     * const testimonial = homeStore.getTestimonialByIndex(0)
     * ```
     */
    getTestimonialByIndex(index: number): Reviewer | undefined {
      return this.testimonials[index]
    },
  },

  /**
   * Store getters for computed properties
   * 
   * @type {Object}
   */
  getters: {
    /**
     * Get the total number of features
     * 
     * @returns {number} Number of features
     * 
     * @example
     * ```typescript
     * const featureCount = homeStore.featureCount
     * ```
     */
    featureCount(): number {
      return this.features.length
    },

    /**
     * Get the total number of testimonials
     * 
     * @returns {number} Number of testimonials
     * 
     * @example
     * ```typescript
     * const testimonialCount = homeStore.testimonialCount
     * ```
     */
    testimonialCount(): number {
      return this.testimonials.length
    },

    /**
     * Get features with search functionality
     * 
     * @param {string} searchTerm - Term to search in feature titles and descriptions
     * @returns {Feature[]} Filtered array of features
     * 
     * @example
     * ```typescript
     * const searchResults = homeStore.getFeaturesBySearch('search')
     * ```
     */
    getFeaturesBySearch: (state) => (searchTerm: string): Feature[] => {
      const term = searchTerm.toLowerCase()
      return state.features.filter(
        feature =>
          feature.title?.toLowerCase().includes(term) ||
          feature.description?.toLowerCase().includes(term)
      )
    },

    /**
     * Get testimonials with search functionality
     * 
     * @param {string} searchTerm - Term to search in testimonial names, addresses, and messages
     * @returns {Reviewer[]} Filtered array of testimonials
     * 
     * @example
     * ```typescript
     * const searchResults = homeStore.getTestimonialsBySearch('Ava')
     * ```
     */
    getTestimonialsBySearch: (state) => (searchTerm: string): Reviewer[] => {
      const term = searchTerm.toLowerCase()
      return state.testimonials.filter(
        testimonial =>
          testimonial.name?.toLowerCase().includes(term) ||
          testimonial.address?.toLowerCase().includes(term) ||
          testimonial.message?.toLowerCase().includes(term)
      )
    },

    /**
     * Get testimonials by star rating
     * 
     * @param {number} stars - Star rating to filter by
     * @returns {Reviewer[]} Filtered array of testimonials
     * 
     * @example
     * ```typescript
     * const fiveStarReviews = homeStore.getTestimonialsByStars(5)
     * ```
     */
    getTestimonialsByStars: (state) => (stars: number): Reviewer[] => {
      return state.testimonials.filter(testimonial => testimonial.stars === stars)
    },
  },
})
