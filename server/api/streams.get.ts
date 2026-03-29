import { getTwitchToken } from '../utils/twitchToken'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()

  const response = await fetch('https://api.twitch.tv/helix/streams?first=100&language=es', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': config.twitchClientId,
    },
  })

  if (!response.ok) {
    throw createError({ statusCode: response.status, message: 'Twitch API error' })
  }

  const data = await response.json()

  const shuffled = data.data.sort(() => Math.random() - 0.5)

  return { data: shuffled.slice(0, 48) }
})
