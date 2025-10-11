
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
export interface Ingredients {
    id: number;
    name?: string;
    amount?: number;
    unit?: string;
}