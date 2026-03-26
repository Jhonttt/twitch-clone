<script setup lang="ts">
  import type { ChannelPageData } from '~~/types/channel'

  const channelStore = useChannelsStore()
  const route = useRoute()
  const login = computed(() => route.params.streamer as string)
  const host = useRequestURL().hostname
  const { data, status } = await useFetch<ChannelPageData>(() => `/api/channels/${login.value}`)

  const viewerCount = ref(data.value?.stream?.viewer_count ?? 0)

  const viewersFormatted = computed(() => (data.value?.stream ? rounded(viewerCount.value) : null))

  const elapsed = ref('')

  function updateElapsed() {
    if (!data.value?.stream?.started_at) return
    const start = new Date(data.value.stream.started_at).getTime()
    const diff = Math.floor((Date.now() - start) / 1000)
    const h = Math.floor(diff / 3600)
      .toString()
      .padStart(2, '0')
    const m = Math.floor((diff % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const s = Math.floor(diff % 60)
      .toString()
      .padStart(2, '0')
    elapsed.value = `${h}:${m}:${s}`
  }

  async function refreshViewers() {
    if (!data.value?.stream) return
    const res = await $fetch<ChannelPageData>(`/api/channels/${login.value}`)
    if (res?.stream) {
      viewerCount.value = res.stream.viewer_count
    }
  }

  onMounted(() => {
    updateElapsed()
    const elapsedInterval = setInterval(updateElapsed, 1000)
    const viewersInterval = setInterval(refreshViewers, 10000)

    onUnmounted(() => {
      clearInterval(elapsedInterval)
      clearInterval(viewersInterval)
    })
  })
</script>

<template>
  <div v-if="status === 'pending'" class="flex items-center justify-center h-full">
    <span class="text-text-muted">Cargando...</span>
  </div>
  <div v-else-if="data" class="flex h-full relative">
    <a
      href="#"
      :class="[
        'absolute z-10 transition-all duration-300 hover:rounded-full flex items-center justify-center',
        channelStore.isOpenRight
          ? 'right-[298px] top-1.5 hover:bg-chat-hover size-8'
          : 'right-2 top-3.5 hover:bg-chat-hover size-8',
      ]"
      @click="channelStore.isOpenRight = !channelStore.isOpenRight"
    >
      <UiCollapse
        :class="[
          'fill-white size-5 transition-transform duration-300',
          channelStore.isOpenRight ? 'rotate-180' : '',
        ]"
      />
    </a>

    <div class="flex flex-col flex-1 min-w-0">
      <div class="relative flex-1 min-h-0 bg-black">
        <iframe
          v-if="data.stream"
          :src="`https://player.twitch.tv/?channel=${login}&parent=${host}&autoplay=true`"
          class="absolute inset-0 w-full h-full"
          allowfullscreen
        />
      </div>

      <div class="flex items-center gap-4 px-4 py-3 shrink-0">
        <div class="relative shrink-0 flex flex-col items-center">
          <img
            :src="data.user.profile_image_url"
            :alt="data.user.display_name"
            class="w-14 h-14 rounded-full"
          />
          <span
            v-if="data.stream"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-1.5 py-0.5 rounded bg-state-live whitespace-nowrap"
          >
            LIVE
          </span>
        </div>

        <div class="flex flex-col min-w-0 w-full gap-0.5">
          <div class="flex justify-between items-center">
            <span class="font-bold text-lg leading-tight">{{ data.user.display_name }}</span>
            <div class="flex gap-2 items-center">
              <button
                class="flex items-center gap-2 bg-[#199AFC] rounded px-2 py-1 hover:bg-[#19AFFF]"
              >
                <UiFollow />
                Follow
              </button>
              <button
                class="flex items-center gap-2 bg-bg-input hover:bg-tag-bg-hover rounded px-2 py-1"
              >
                <UiSubscribe />
                Subscribe
                <UiDown class="size-4 fill-text-primary" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span v-if="data.stream" class="text-sm font-medium text-white truncate">
              {{ data.stream.title }}
            </span>
            <div v-if="data.stream" class="flex items-center gap-2 text-sm text-text-muted">
              <span class="flex items-center text-state-live">
                <UiProfile class="fill-state-live" />
                {{ viewersFormatted }}
              </span>
              <span>{{ elapsed }}</span>
            </div>
          </div>

          <div v-if="data.stream" class="flex items-center gap-2 flex-wrap text-sm mt-0.5">
            <span class="text-purple-400 font-medium">{{ data.stream.game_name }}</span>
            <span
              v-for="tag in data.stream.tags"
              :key="tag"
              class="bg-tag-bg rounded-full px-1 py-0.5 shrink-0 hover:bg-tag-bg-hover"
            >
              <UiTag :label="tag" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat -->
    <div
      :class="[
        'shrink-0 border-l border-bg-base flex flex-col transition-all duration-300 overflow-hidden',
        channelStore.isOpenRight ? 'w-[340px]' : 'w-0',
      ]"
    >
      <iframe
        :src="`https://www.twitch.tv/embed/${login}/chat?parent=${host}&darkpopout`"
        class="flex-1 w-full h-full"
      />
    </div>
  </div>
</template>
