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

export type { Feature, Reviewer, IconType, User }
