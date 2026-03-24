<script setup lang="ts">
  import type { Channel } from '../../../types/channel'
  import { rounded } from '#imports'

  defineProps<{
    channel: Channel
    isOpen: boolean
  }>()
</script>

<template>
  <li>
    <a href="#" class="flex items-center gap-3 px-6">
      <img :src="channel.avatar" alt="" class="rounded-full size-8" />
      <div v-if="isOpen" class="flex-col justify-center flex-1 hidden lg:flex">
        <div class="flex items-center justify-between">
          <h2 class="leading-none text-sm">{{ channel.name }}</h2>
          <div class="flex items-baseline gap-1 justify-start">
            <div class="bg-red-600 size-2 rounded-full" />
            <p class="text-sm leading-none">{{ rounded(channel.viewers) }}</p>
          </div>
        </div>
        <p class="text-sm text-text-muted leading-tight">{{ channel.category }}</p>
      </div>
    </a>
  </li>
</template>
