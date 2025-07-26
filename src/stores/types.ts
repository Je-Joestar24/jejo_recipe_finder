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

export type { Feature, Reviewer, IconType }
