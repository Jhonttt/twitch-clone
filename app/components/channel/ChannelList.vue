<script setup lang="ts">
  import type { TwitchStream, TwitchUser } from '~~/types/channel'

  const props = defineProps<{
    streams: TwitchStream[]
  }>()

  const channelStore = useChannelsStore()

  const usersUrl = computed(() => {
    if (!props.streams.length) return null
    const params = props.streams.map((s) => `login=${s.user_login}`).join('&')
    return `/api/users?${params}`
  })

  const { data: usersData } = await useFetch<{ data: TwitchUser[] }>(
    () => usersUrl.value ?? '/api/users',
    { watch: [usersUrl] }
  )

  const usersMap = computed(() => {
    const map: Record<string, TwitchUser> = {}
    for (const user of usersData.value?.data ?? []) {
      map[user.login] = user
    }
    return map
  })
</script>

<template>
  <header class="flex items-center justify-center gap-10 mb-3 px-4">
    <p v-if="channelStore.isOpen" class="text-sm lg:block hidden">RECOMMENDED CHANNELS</p>
    <a href="#" @click="channelStore.isOpen = !channelStore.isOpen">
      <UiCollapse
        :class="['fill-white size-5 hidden lg:block', channelStore.isOpen ? '' : 'rotate-180']"
        class="transition-transform duration-300"
      />
    </a>
  </header>
  <ul class="flex flex-col gap-2">
    <ChannelItem
      v-for="stream in streams"
      :key="stream.id"
      :stream="stream"
      :user="usersMap[stream.user_login] ?? null"
      :is-open="channelStore.isOpen"
    />
  </ul>
</template>
