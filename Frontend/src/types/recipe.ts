import type { Ingredients } from "./Ingredients"

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
export interface Recipe {
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