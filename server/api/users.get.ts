export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()
  const query = getQuery(event)

  const logins = Array.isArray(query.login) ? query.login : query.login ? [query.login] : []

  if (logins.length === 0) return { data: [] }

  const params = logins.map((l) => `login=${l}`).join('&')
  const response = await fetch(`https://api.twitch.tv/helix/users?${params}`, {
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
