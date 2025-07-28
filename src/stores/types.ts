type IconType = 'search' | 'save' | 'details' | 'fast'

interface Feature {
  title?: string
  description?: string
  icon?: IconType
}

interface Reviewer {
  name?: string
  address?: string
  message?: string
  stars?: number
}

interface User {
  uuid?: string
  name: string
  email: string
  password: string
}

interface Recipe {
  id: number
  title: string
  image?: string
  readyInMinutes: number
  servings?: number
  dishTypes?: string[]
  summary?: string
  extendedIngredients?: Array<{ id: number; name: string; amount: number; unit: string }>
  instructions?: string
  sourceUrl?: string
}

export type { Feature, Reviewer, IconType, User, Recipe }
