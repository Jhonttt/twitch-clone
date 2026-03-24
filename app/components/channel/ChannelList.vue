<script setup lang="ts">
  const channelStore = useChannelsStore()
</script>

<template>
  <header class="flex items-center justify-center gap-10 mb-3 px-4">
    <p v-if="channelStore.isOpen" class="text-sm lg:block hidden">RECOMMENDED CHANELS</p>
    <a href="#" @click="channelStore.isOpen = !channelStore.isOpen">
      <UiCollapse
        :class="['fill-white size-5 hidden lg:block', channelStore.isOpen ? '' : 'rotate-180']"
        class="transition-transform duration-300"
      />
    </a>
  </header>

  <ul class="flex flex-col gap-2">
    <ChannelItem
      v-for="channel in channelStore.channels"
      :key="channel.id"
      :channel="channel"
      :is-open="channelStore.isOpen"
    />
  </ul>
</template>
