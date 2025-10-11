export interface UpdateUserPayload {
    name: string
    email: string
    password?: string
    new_password?: string
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

export interface User {
    id: number
    name: string
    email: string
    email_verified_at?: string | null
    created_at?: string
    updated_at?: string
}