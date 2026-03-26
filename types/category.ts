export type IconName = 'Gaming' | 'Helmet' | 'Microphone' | 'Creative' | 'Trophy'

export interface TwitchCategory {
  id: string
  name: string
  box_art_url: string
  viewer_count?: number
}

export interface TwitchStream {
  id: string
  game_id: string
  viewer_count: number
}

export interface TwitchResponse<T> {
  data: T[]
}

export interface NavCategory {
  id: number
  name: string
  icon: IconName
}
