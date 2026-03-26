<script setup lang="ts">
  import type { TwitchStream, TwitchUser } from '~~/types/channel'

  const props = defineProps<{
    stream: TwitchStream
    user: TwitchUser | null
    isOpen: boolean
  }>()

  const isXl = useMediaQuery('(min-width: 1280px)')

  const isExpandedMode = computed(() => props.isOpen && isXl.value)
</script>

<template>
  <li class="relative group">
    <NuxtLink :href="`/${stream.user_login}`" class="flex items-center gap-3 px-6">
      <img
        :src="user?.profile_image_url ?? '/default-avatar.png'"
        :alt="stream.user_name"
        class="rounded-full size-8 shrink-0"
      />
      <div v-if="isOpen" class="flex-col justify-center flex-1 hidden xl:flex gap-0.5">
        <div class="flex items-center justify-between gap-2">
          <h2 class="leading-none text-sm truncate">{{ stream.user_name }}</h2>
          <div class="flex items-baseline gap-1 shrink-0">
            <div class="bg-red-600 size-2 rounded-full" />
            <p class="text-sm leading-none">{{ rounded(stream.viewer_count) }}</p>
          </div>
        </div>
        <p class="text-sm text-text-muted leading-tight line-clamp-2">{{ stream.game_name }}</p>
      </div>
    </NuxtLink>

    <div
      :class="[
        'absolute top-1/2 -translate-y-1/2 ml-2 z-50 bg-bg-input border border-bg-input rounded px-3 py-2 w-52 flex flex-col gap-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150',
        isExpandedMode ? 'left-64' : 'left-16',
      ]"
    >
      <template v-if="isExpandedMode">
        <p class="text-xs text-text-primary leading-tight line-clamp-2">{{ stream.title }}</p>
      </template>

      <template v-else>
        <h2 class="text-sm font-semibold leading-none text-action-sub_bg truncate">
          {{ stream.user_name }}
        </h2>
        <p class="text-xs text-text-primary leading-tight line-clamp-2">{{ stream.title }}</p>
        <div class="flex items-baseline gap-1 text-text-secondary">
          <div class="bg-red-600 size-2 rounded-full shrink-0" />
          <p class="text-xs leading-none truncate">
            In live | {{ rounded(stream.viewer_count) }} viewers
          </p>
        </div>
      </template>
    </div>
  </li>
</template>
