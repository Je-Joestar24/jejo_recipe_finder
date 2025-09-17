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
type IconType = 'search' | 'save' | 'details' | 'fast'

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
interface Feature {
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
interface Reviewer {
  name?: string
  address?: string
  message?: string
  stars?: number
}

/**
 * User interface for authentication and profile management
 *
 * Represents a user account with authentication and profile information.
 * Used for login, signup, and profile management throughout the application.
 *
 * @interface User
 * @property {string} [uuid] - Unique user identifier (auto-generated)
 * @property {string} name - User's display name
 * @property {string} email - User's email address (used for login)
 * @property {string} password - User's password (stored in plain text for demo)
 *
 * @example
 * ```typescript
 * const user: User = {
 *   uuid: '20231201143022',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'password123'
 * }
 * ```
 */
interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Ingredient interface for recipe components
 *
 * Represents a single ingredient used in a recipe. Includes optional details
 * such as the ingredient name, quantity, and measurement unit. Used inside
 * the `Recipe` interface for building the ingredient list.
 *
 * @interface Ingredients
 * @property {number} id - Unique identifier for the ingredient (from API or database)
 * @property {string} [name] - Ingredient name (e.g., "sugar", "spaghetti")
 * @property {number} [amount] - Quantity of the ingredient
 * @property {string} [unit] - Unit of measurement (e.g., "g", "cups", "tbsp")
 *
 * @example
 * ```typescript
 * const ingredient: Ingredients = {
 *   id: 1,
 *   name: 'flour',
 *   amount: 200,
 *   unit: 'g'
 * }
 * ```
 */
interface Ingredients {
  id: number;
  name?: string;
  amount?: number;
  unit?: string;
}

/**
 * Recipe interface for recipe data management
 *
 * Represents a complete recipe with all its details including ingredients,
 * instructions, and metadata. Used for API responses and saved recipes.
 *
 * @interface Recipe
 * @property {number} id - Unique recipe identifier from API
 * @property {string} title - Recipe name/title
 * @property {string} [image] - Recipe image URL
 * @property {number} readyInMinutes - Cooking time in minutes
 * @property {number} [servings] - Number of servings the recipe makes
 * @property {string[]} [dishTypes] - Array of dish type categories
 * @property {string} [summary] - Recipe description/summary (HTML format)
 * @property {Array<Ingredients>} [extendedIngredients] - Detailed ingredient list
 * @property {string} [instructions] - Cooking instructions (HTML format)
 * @property {string} [sourceUrl] - Original recipe source URL
 * @property {string} [savedBy] - UUID of user who saved this recipe
 *
 * @example
 * ```typescript
 * const recipe: Recipe = {
 *   id: 12345,
 *   title: 'Spaghetti Carbonara',
 *   image: 'https://example.com/carbonara.jpg',
 *   readyInMinutes: 30,
 *   servings: 4,
 *   dishTypes: ['main course', 'pasta'],
 *   summary: 'Classic Italian pasta dish...',
 *   extendedIngredients: [
 *     { id: 1, name: 'spaghetti', amount: 500, unit: 'g' }
 *   ],
 *   instructions: '<ol><li>Boil pasta...</li></ol>',
 *   sourceUrl: 'https://example.com/recipe',
 *   savedBy: 'user-uuid-123'
 * }
 * ```
 */
interface Recipe {
  id: number
  title: string
  image?: string
  readyInMinutes: number
  servings?: number
  dishTypes?: string[]
  summary?: string
  extendedIngredients?: Array<Ingredients>
  instructions?: string
  sourceUrl?: string
}

export type { Feature, Reviewer, IconType, User, Recipe, Ingredients }
