<script setup lang="ts">
  import type { ChannelPageData } from '~~/types/channel'
  const channelStore = useChannelsStore()
  const route = useRoute()
  const login = computed(() => route.params.streamer as string)
  const host = useRequestURL().hostname
  const { data, status } = await useFetch<ChannelPageData>(() => `/api/channels/${login.value}`)
  const viewersFormatted = computed(() =>
    data.value?.stream ? rounded(data.value.stream.viewer_count) : null
  )
</script>

<template>
  <div v-if="status === 'pending'" class="flex items-center justify-center h-full">
    <span class="text-text-muted">Cargando...</span>
  </div>

  <div v-else-if="data" class="flex h-full relative">
    <a
      href="#"
      :class="[
        'absolute z-10 transition-all duration-300',
        channelStore.isOpenRight ? 'right-[310px] top-2' : 'right-2 top-2',
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
      <div class="relative w-full bg-black" style="aspect-ratio: 16/9">
        <iframe
          v-if="data.stream"
          :src="`https://player.twitch.tv/?channel=${login}&parent=${host}&autoplay=true`"
          class="absolute inset-0 w-full h-full"
          allowfullscreen
        />
      </div>

      <div class="flex items-start gap-4 px-4 py-3">
        <img
          :src="data.user.profile_image_url"
          :alt="data.user.display_name"
          class="w-14 h-14 rounded-full shrink-0"
        />
        <div class="flex flex-col min-w-0">
          <span class="font-bold text-lg leading-tight">{{ data.user.display_name }}</span>
          <span v-if="data.stream" class="text-sm text-text-muted truncate">
            {{ data.stream.title }}
          </span>
          <div class="flex items-center gap-3 mt-1 text-sm text-text-muted">
            <span v-if="data.stream" class="text-purple-400 font-medium">
              {{ data.stream.game_name }}
            </span>
            <span v-if="viewersFormatted" class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-red-500 inline-block" />
              {{ viewersFormatted }} espectadores
            </span>
          </div>
        </div>
      </div>
    </div>

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
