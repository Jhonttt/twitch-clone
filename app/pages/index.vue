<script setup lang="ts">
  import type { TwitchStream } from '~~/types/channel'
  import type { TwitchCategory } from '~~/types/category'
  const useChannel = useChannelsStore()

  const {
    data: streamerData,
    status: streamerStatus,
    error: streamerError,
  } = useFetch<{ data: TwitchStream[] }>('/api/streams', { lazy: true, server: false })

  const {
    data: categoryData,
    status: categoryStatus,
    error: categoryError,
  } = useFetch<{ data: TwitchCategory[] }>('/api/categories', { lazy: true, server: false })

  const categories = computed(() => categoryData.value?.data ?? [])

  const streams = computed(() => streamerData.value?.data ?? [])
  const firstSection = computed(() => streams.value.slice(0, 12))
  const secondSection = computed(() => streams.value.slice(12, 24))
  const thirdSection = computed(() => streams.value.slice(24, 36))
  const fourthSection = computed(() => streams.value.slice(36, 48))
</script>

<template>
  <main class="mt-4">
    <p v-if="streamerError || categoryError">Error</p>
    <div v-else>
      <StreamCards
        headline="Live channel"
        text="we think you'll like"
        :streams="firstSection"
        :is-open="useChannel.isOpen"
        :status="streamerStatus"
      />
      <StreamCards
        headline="Live channel"
        text="we think you'll like"
        :streams="secondSection"
        :is-open="useChannel.isOpen"
        :status="streamerStatus"
      />
      <CategoryCards
        headline="Categories"
        text="we think you'll like"
        :categories="categories"
        :is-open="useChannel.isOpen"
        :status="categoryStatus"
      />
      <StreamCards
        headline="Live channel"
        text="we think you'll like"
        :streams="thirdSection"
        :is-open="useChannel.isOpen"
        :status="streamerStatus"
      />
      <StreamCards
        headline="Live channel"
        text="we think you'll like"
        :streams="fourthSection"
        :is-open="useChannel.isOpen"
        :status="streamerStatus"
      />
    </div>
  </main>
</template>
