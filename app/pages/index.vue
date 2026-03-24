<script setup lang="ts">
  const channelStore = useChannelsStore()
</script>

<template>
  <main class="mt-4">
    <StreamCards
      headline="Live channel"
      text="we think you'll like"
      :streams="channelStore.streams"
      :is-open="channelStore.isOpen"
    />
  </main>
</template>
