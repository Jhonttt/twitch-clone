<script setup lang="ts">
  import type { TwitchStream, TwitchUser, ChannelPageData } from '~~/types/channel'

  const props = defineProps<{
    stream: TwitchStream
  }>()

  const { data, status, error } = await useFetch<ChannelPageData>(
    () => `/api/channels/${props.stream.user_login}`
  )

  const user = computed<TwitchUser | null>(() => data.value?.user ?? null)

  const thumbnail = computed(() =>
    props.stream.thumbnail_url.replace('{width}', '440').replace('{height}', '248')
  )

  const streamColor = computed(() => {
    const colors = ['#9146FF', '#E91916', '#00C8AF', '#FF6B35', '#F72585', '#4CC9F0']

    const hash = props.stream.user_login
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  })
</script>

<template>
  <article>
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Error 2</p>
    <NuxtLink v-else :href="stream.user_name" class="flex flex-col gap-2">
      <div class="relative group">
        <div class="absolute inset-0 rounded-md" :style="{ backgroundColor: streamColor }" />
        <div
          class="relative overflow-hidden rounded-md transition-transform duration-200 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
        >
          <img :src="thumbnail" alt="" class="w-full" />
          <span
            :class="[
              'absolute top-2 left-2 text-white text-xs font-bold px-1.5 py-0.5 rounded',
              stream.type === 'live' ? 'bg-state-live' : 'bg-text-muted',
            ]"
          >
            {{ stream.type === 'live' ? 'LIVE' : 'offline' }}
          </span>
          <span
            class="absolute bottom-2 left-2 bg-bg-base text-white text-xs px-1.5 py-0.5 rounded"
          >
            {{ rounded(stream.viewer_count) }} viewers
          </span>
        </div>
      </div>
      <div class="flex gap-3">
        <img :src="user?.profile_image_url" alt="" class="rounded-full size-10 shrink-0" />
        <div class="flex flex-col min-w-0">
          <h2 class="text-sm font-semibold truncate hover:text-action-sub_bg">
            {{ stream.title }}
          </h2>
          <p class="text-xs text-gray-400 truncate">{{ stream.user_name }}</p>
          <p class="text-xs text-gray-400 truncate hover:text-action-sub_bg">
            {{ stream.game_name }}
          </p>
          <ul class="flex gap-2 text-xs mt-1 overflow-hidden">
            <li
              v-for="tag in stream.tags"
              :key="tag"
              class="bg-tag-bg rounded-full px-1 py-0.5 shrink-0 hover:bg-tag-bg-hover"
            >
              <UiTag :label="tag" />
            </li>
          </ul>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
