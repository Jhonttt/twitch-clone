import type { TwitchCategory, TwitchStream, TwitchResponse } from '~~/types/category'
import { getTwitchToken } from '../utils/twitchToken'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const token = await getTwitchToken()

  const headers = {
    Authorization: `Bearer ${token}`,
    'Client-Id': config.twitchClientId,
  }

  const categoriesRes = await fetch('https://api.twitch.tv/helix/games/top?first=12', { headers })
  const categoriesData: TwitchResponse<TwitchCategory> = await categoriesRes.json()

  if (!categoriesData.data) {
    throw createError({
      statusCode: 500,
      message: `Twitch error: ${JSON.stringify(categoriesData)}`,
    })
  }

  const categoriesWithViewers = await Promise.all(
    categoriesData.data.map(async (category: TwitchCategory) => {
      const streamsRes = await fetch(
        `https://api.twitch.tv/helix/streams?game_id=${category.id}&first=100`,
        { headers }
      )
      const streamsData: TwitchResponse<TwitchStream> = await streamsRes.json()

      const totalViewers = streamsData.data.reduce(
        (sum: number, stream: TwitchStream) => sum + stream.viewer_count,
        0
      )

      return {
        ...category,
        viewer_count: totalViewers,
        box_art_url: category.box_art_url.replace('{width}', '285').replace('{height}', '380'),
      }
    })
  )

  return { data: categoriesWithViewers }
})
