export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()
  const login = getRouterParam(event, 'login')

  const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': config.twitchClientId,
    },
  })

  if (!userResponse.ok) {
    throw createError({ statusCode: userResponse.status, message: 'Twitch API error' })
  }

  const userData = await userResponse.json()
  const broadcasterId = userData.data[0]?.id

  if (!broadcasterId) {
    throw createError({ statusCode: 404, message: 'Channel not found' })
  }

  const followersResponse = await fetch(
    `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': config.twitchClientId,
      },
    }
  )

  if (!followersResponse.ok) {
    throw createError({ statusCode: followersResponse.status, message: 'Twitch API error' })
  }

  return followersResponse.json()
})
