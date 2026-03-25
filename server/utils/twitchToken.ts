interface TwitchTokenCache {
  token: string
  expiresAt: number
}

let cache: TwitchTokenCache | null = null

export async function getTwitchToken(): Promise<string> {
  const config = useRuntimeConfig()

  if (cache && Date.now() < cache.expiresAt) {
    return cache.token
  }

  try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.twitchClientId,
        client_secret: config.twitchClientSecret,
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) {
      throw createError({ statusCode: response.status, message: 'Response no valid' })
    }

    const data = await response.json()

    cache = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000 - 60000,
    }

    return data.access_token
  } catch (error) {
    throw new Error(`Error: ${error}`)
  }
}
