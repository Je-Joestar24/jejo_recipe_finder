type IconType = 'search' | 'save' | 'details' | 'fast'

interface Feature {
  title?: string
  description?: string
  icon?: IconType
}

export type { Feature, IconType }
