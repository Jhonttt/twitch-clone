export type IconName = 'Gaming' | 'Helmet' | 'Microphone' | 'Creative' | 'Trophy'

export interface Category {
  id: number
  name: string
  viewers: number
  thumbnail: string
  tags: string[]
}

export interface NavCategory {
  id: number
  name: string
  icon: IconName
}
