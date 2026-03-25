import type { TwitchUser, TwitchStream, ChannelPageData } from '~~/types/channel'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()
  const login = getRouterParam(event, 'login')

  const headers = {
    Authorization: `Bearer ${token}`,
    'Client-Id': config.twitchClientId,
  }

  const [userRes, streamRes] = await Promise.all([
    fetch(`https://api.twitch.tv/helix/users?login=${login}`, { headers }),
    fetch(`https://api.twitch.tv/helix/streams?user_login=${login}`, { headers }),
  ])

  if (!userRes.ok) throw createError({ statusCode: userRes.status, message: 'Twitch API error' })
  if (!streamRes.ok)
    throw createError({ statusCode: streamRes.status, message: 'Twitch API error' })

  const [userData, streamData] = await Promise.all([userRes.json(), streamRes.json()])

  const user: TwitchUser = userData.data[0]
  const stream: TwitchStream | null = streamData.data[0] ?? null

  if (!user) throw createError({ statusCode: 404, message: 'Canal no encontrado' })

  return { user, stream } satisfies ChannelPageData
})
