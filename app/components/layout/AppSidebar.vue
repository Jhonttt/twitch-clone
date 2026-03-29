<script setup lang="ts">
  import type { TwitchStream } from '~~/types/channel'

  const { data, status, error } = await useFetch<{ data: TwitchStream[] }>('/api/streams')
  const streams = computed(() => data.value?.data ?? [])
  const limitedStreams = computed(() => streams.value.slice(0, 12))
</script>

<template>
  <aside class="py-1 pt-6">
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Error</p>
    <ChannelList v-else :streams="limitedStreams ?? []" />
  </aside>
</template>
