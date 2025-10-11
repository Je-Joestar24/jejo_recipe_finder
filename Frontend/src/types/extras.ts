/**
 * Type Definitions
 *
 * Centralized type definitions for the Jejo Recipe Finder application.
 * This module contains all TypeScript interfaces and types used throughout
 * the application for type safety and consistency.
 *
 * @module stores/types
 * @author Jejomar Parrilla
 * @version 1.0.0
 */

/**
 * Icon types for feature display
 *
 * Defines the available icon types used in feature components.
 * Each icon corresponds to a specific feature or functionality.
 *
 * @typedef {'search' | 'save' | 'details' | 'fast'} IconType
 */
export type IconType = 'search' | 'save' | 'details' | 'fast'

/**
 * Feature interface for home page features
 *
 * Represents a feature highlight displayed on the home page.
 * Used to showcase application capabilities with icons and descriptions.
 *
 * @interface Feature
 * @property {string} [title] - Feature title/name
 * @property {string} [description] - Feature description text
 * @property {IconType} [icon] - Icon identifier for the feature
 *
 * @example
 * ```typescript
 * const feature: Feature = {
 *   title: 'Smart Search',
 *   description: 'Find meals by ingredients, dietary needs, or cravings.',
 *   icon: 'search'
 * }
 * ```
 */
export interface Feature {
    title?: string
    description?: string
    icon?: IconType
}

/**
 * Reviewer interface for testimonials
 *
 * Represents a user testimonial with rating and location information.
 * Used for social proof and building trust on the home page.
 *
 * @interface Reviewer
 * @property {string} [name] - Reviewer's name
 * @property {string} [address] - Reviewer's location/city
 * @property {string} [message] - Testimonial message text
 * @property {number} [stars] - Star rating (1-5)
 *
 * @example
 * ```typescript
 * const reviewer: Reviewer = {
 *   name: 'Ava',
 *   address: 'San Francisco',
 *   message: 'JRF makes it so easy to find new recipes!',
 *   stars: 5
 * }
 * ```
 */
export interface Reviewer {
    name?: string
    address?: string
    message?: string
    stars?: number
}

