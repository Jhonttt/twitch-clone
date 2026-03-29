<script setup lang="ts">
  import type { ChannelPageData } from '~~/types/channel'

  const channelStore = useChannelsStore()
  const route = useRoute()
  const login = computed(() => route.params.streamer as string)
  const host = useRequestURL().hostname
  const { data, status } = await useFetch<ChannelPageData>(() => `/api/channels/${login.value}`)

  const viewerCount = ref(data.value?.stream?.viewer_count ?? 0)
  const isDescriptionOpen = ref(false)

  const viewersFormatted = computed(() => (data.value?.stream ? rounded(viewerCount.value) : null))

  const formattedFollowers = computed(() => {
    // Simulated followers since Twitch API requires authentication
    return rounded(Math.floor(Math.random() * 1000000) + 10000)
  })

  const formattedCreatedAt = computed(() => {
    if (!data.value?.user.created_at) return ''
    return new Date(data.value.user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

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
    <span class="text-text-muted">Loading...</span>
  </div>
  <div v-else-if="data" class="flex h-full relative">
    <a
      href="#"
      :class="[
        'fixed z-10 transition-all duration-300 hover:rounded-full flex items-center justify-center',
        channelStore.isOpenRight
          ? 'right-[298px] top-[60px] hover:bg-chat-hover size-8'
          : 'right-2 top-[68px] hover:bg-chat-hover size-8',
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

    <!-- Scrollable content - hide scrollbar when chat is open -->
    <div
      :class="[
        'flex flex-col flex-1 min-w-0 overflow-y-auto',
        channelStore.isOpenRight ? 'scrollbar-hide' : '',
      ]"
    >
      <!-- Video container like Twitch - uses calc to fill available space -->
      <div class="relative bg-black video-container">
        <iframe
          v-if="data.stream"
          :src="`https://player.twitch.tv/?channel=${login}&parent=${host}&autoplay=true`"
          class="absolute inset-0 w-full h-full"
          allowfullscreen
        />
      </div>

      <div class="flex items-center gap-4 px-4 py-3">
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

      <!-- Channel Description Panel -->
      <div class="border-t border-[#2f2f35]">
        <button
          class="group w-full flex items-center justify-between px-5 py-4 hover:bg-[#1f1f23]/80 transition-all duration-200"
          @click="isDescriptionOpen = !isDescriptionOpen"
        >
          <div class="flex items-center gap-3">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <img
                :src="data.user.profile_image_url"
                :alt="data.user.display_name"
                class="relative w-10 h-10 rounded-full ring-2 ring-purple-500/30"
              />
            </div>
            <span class="text-base font-semibold text-white"
              >About {{ data.user.display_name }}</span
            >
          </div>
          <div
            :class="[
              'flex items-center justify-center w-8 h-8 rounded-full bg-[#2f2f35] group-hover:bg-[#3f3f45] transition-all duration-300',
              isDescriptionOpen ? 'rotate-180' : '',
            ]"
          >
            <UiDown class="size-4 fill-white/70" />
          </div>
        </button>

        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[800px] opacity-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="max-h-[800px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-show="isDescriptionOpen" class="overflow-hidden">
            <div class="px-5 pb-6">
              <!-- Stats Grid -->
              <div
                class="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-[#18181b] to-[#1f1f23] rounded-xl border border-[#2f2f35]/50 mb-5"
              >
                <div class="flex flex-col items-center p-3">
                  <span
                    class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {{ formattedFollowers }}
                  </span>
                  <span class="text-xs text-[#adadb8] uppercase tracking-wider mt-1"
                    >Followers</span
                  >
                </div>
                <div class="flex flex-col items-center p-3 border-l border-[#2f2f35]">
                  <span
                    class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    {{ data.stream ? viewersFormatted : '0' }}
                  </span>
                  <span class="text-xs text-[#adadb8] uppercase tracking-wider mt-1">Watching</span>
                </div>
              </div>

              <!-- Bio Section -->
              <div class="mb-5">
                <div
                  v-if="data.user.description"
                  class="p-4 bg-[#18181b] rounded-xl border border-[#2f2f35]/50"
                >
                  <p class="text-sm text-[#dedee3] leading-relaxed">
                    {{ data.user.description }}
                  </p>
                </div>
                <div
                  v-else
                  class="p-4 bg-[#18181b] rounded-xl border border-[#2f2f35]/50 border-dashed"
                >
                  <p class="text-sm text-[#71717a] italic text-center">
                    This channel has no description yet.
                  </p>
                </div>
              </div>

              <!-- Info Pills -->
              <div class="flex flex-wrap gap-2">
                <div
                  class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2f2f35]/50 rounded-full"
                >
                  <svg
                    class="size-3.5 text-[#adadb8]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h1z"
                    />
                  </svg>
                  <span class="text-xs text-[#dedee3]">Joined {{ formattedCreatedAt }}</span>
                </div>

                <div
                  v-if="data.user.broadcaster_type === 'partner'"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-full"
                >
                  <svg class="size-3.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-semibold text-purple-300">Partner</span>
                </div>

                <div
                  v-else-if="data.user.broadcaster_type === 'affiliate'"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-full"
                >
                  <svg class="size-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-xs font-semibold text-blue-300">Affiliate</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Fixed Chat on the right -->
    <div
      :class="[
        'shrink-0 border-l border-bg-base flex flex-col transition-all duration-300 overflow-hidden h-full',
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

<style scoped>
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Video container - fills available space like Twitch */
  .video-container {
    height: calc(100vh - 50px - 140px);
    min-height: 300px;
  }
</style>
