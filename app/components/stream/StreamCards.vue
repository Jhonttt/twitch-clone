<script setup lang="ts">
  import type { TwitchStream } from '~~/types/channel'

  const props = defineProps<{
    headline: string
    text: string
    streams: TwitchStream[]
    isOpen: boolean
  }>()

  const windowWidth = ref(0)

  const cols = computed(() => {
    const width = windowWidth.value
    if (props.isOpen) {
      if (width >= 1280) return 5
      if (width >= 1024) return 4
      if (width >= 768) return 3
      if (width >= 640) return 2
      return 1
    } else {
      if (width >= 1280) return 6
      if (width >= 1024) return 5
      if (width >= 768) return 4
      if (width >= 640) return 2
      return 1
    }
  })

  const showAll = ref(false)

  const onResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  const visibleStreams = computed(() => {
    const limit = showAll.value ? cols.value * 2 : cols.value
    return props.streams.slice(0, limit)
  })
</script>

<template>
  <section>
    <header class="font-semibold mb-2">
      <p>
        {{ headline }} <span class="text-[#199AFC]">{{ text }}</span>
      </p>
    </header>
    <div
      :class="[
        'grid gap-x-2 gap-y-5 mr-4 mb-3',
        props.isOpen
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      ]"
    >
      <StreamCard v-for="stream in visibleStreams" :key="stream.id" :stream="stream" />
    </div>
    <footer class="relative flex justify-center my-6">
      <div class="absolute inset-x-0 top-1/2 border-t border-bg-border" />
      <a
        href="#"
        class="relative flex items-center gap-1 bg-bg-base px-3 cursor-pointer hover:bg-bg-overlay rounded-full py-1.5 group"
        @click.prevent="showAll = !showAll"
      >
        <p class="text-[#199AFC] text-sm group-hover:text-text-primary">
          {{ showAll ? 'Show less' : 'Show more' }}
        </p>
        <UiDown
          :class="[
            'fill-text-primary size-4 transition-transform duration-300',
            showAll ? 'rotate-180' : '',
          ]"
        />
      </a>
    </footer>
  </section>
</template>
