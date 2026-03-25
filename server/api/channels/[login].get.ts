export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()
  const login = getRouterParam(event, 'login')

  const response = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
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
