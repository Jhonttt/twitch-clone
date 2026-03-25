<script setup lang="ts">
  import type { TwitchStream, TwitchUser } from '~~/types/channel'

  defineProps<{
    stream: TwitchStream
    user: TwitchUser | null
    isOpen: boolean
  }>()
</script>

<template>
  <li>
    <NuxtLink :href="`/${stream.user_login}`" class="flex items-center gap-3 px-6">
      <img
        :src="user?.profile_image_url ?? '/default-avatar.png'"
        :alt="stream.user_name"
        class="rounded-full size-8"
      />
      <div v-if="isOpen" class="flex-col justify-center flex-1 hidden lg:flex">
        <div class="flex items-center justify-between">
          <h2 class="leading-none text-sm">{{ stream.user_name }}</h2>
          <div class="flex items-baseline gap-1 justify-start">
            <div class="bg-red-600 size-2 rounded-full" />
            <p class="text-sm leading-none">{{ rounded(stream.viewer_count) }}</p>
          </div>
        </div>
        <p class="text-sm text-text-muted leading-tight">{{ stream.game_name }}</p>
      </div>
    </NuxtLink>
  </li>
</template>
