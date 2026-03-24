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
