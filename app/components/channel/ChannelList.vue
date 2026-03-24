<script setup lang="ts">
  const isOpen = ref(true)
  const channelStore = useChannelsStore()
</script>

<template>
  <header class="flex items-center justify-center gap-10 mb-3 px-4">
    <p v-if="isOpen" class="text-sm lg:block hidden">RECOMMENDED CHANELS</p>
    <a href="#" @click="isOpen = !isOpen">
      <UiCollapse
        :class="['fill-white size-5 hidden lg:block', isOpen ? '' : 'rotate-180']"
        class="transition-transform duration-300"
      />
    </a>
  </header>

  <ul class="flex flex-col gap-2">
    <ChannelItem
      v-for="channel in channelStore.channels"
      :key="channel.id"
      :channel="channel"
      :is-open="isOpen"
    />
  </ul>
</template>
