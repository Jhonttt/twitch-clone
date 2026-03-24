<script setup lang="ts">
  const channelStore = useChannelsStore()
</script>

<template>
  <main>
    <section
      :class="[
        'grid gap-x-2 gap-y-5 mr-4',
        channelStore.isOpen
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      ]"
    >
      <StreamCard />
      <StreamCard />
      <StreamCard />
      <StreamCard />
      <StreamCard />
      <StreamCard />
    </section>
  </main>
</template>
