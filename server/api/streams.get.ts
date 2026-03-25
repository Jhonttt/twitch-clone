import { getTwitchToken } from '../utils/twitchToken'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()

  const response = await fetch('https://api.twitch.tv/helix/streams?first=20', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': config.twitchClientId,
    },
  })

  if (!response.ok) {
    throw createError({ statusCode: response.status, message: 'Twitch API error' })
  }

  return response.json()
})
