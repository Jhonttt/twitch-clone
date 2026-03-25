export interface Channel {
  id: number
  name: string
  category: string
  viewers: number
  isLive: boolean
  avatar: string
}

export interface Stream {
  id: number
  title: string
  streamer: string
  category: string
  viewers: number
  isLive: boolean
  thumbnail: string
  avatar: string
  tags: string[]
}

export interface TwitchStream {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: 'live' | ''
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
  tags: string[]
  is_mature: boolean
}

export interface TwitchUser {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: 'partner' | 'affiliate' | ''
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  created_at: string
}
