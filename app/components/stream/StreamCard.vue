<script setup lang="ts">
  import type { Stream } from '~~/types/channel'
  import { rounded } from '#imports'

  defineProps<{
    stream: Stream
  }>()
</script>

<template>
  <article>
    <a href="" class="flex flex-col gap-2">
      <div class="relative">
        <img :src="stream.thumbnail" alt="" class="w-full" />
        <span
          :class="[
            'absolute top-2 left-2 text-white text-xs font-bold px-1.5 py-0.5 rounded',
            stream.isLive ? 'bg-state-live' : 'bg-text-muted',
          ]"
        >
          {{ stream.isLive ? 'LIVE' : 'offline' }}
        </span>
        <span
          class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded"
        >
          {{ rounded(stream.viewers) }} espectadores
        </span>
      </div>

      <div class="flex gap-3">
        <img :src="stream.avatar" alt="" class="rounded-full size-10 shrink-0" />
        <div class="flex flex-col min-w-0">
          <h2 class="text-sm font-semibold truncate">
            {{ stream.title }}
          </h2>
          <p class="text-xs text-gray-400 truncate">{{ stream.streamer }}</p>
          <p class="text-xs text-gray-400 truncate">{{ stream.category }}</p>
          <ul class="flex gap-2 text-xs mt-1 overflow-hidden">
            <li
              v-for="tag in stream.tags"
              :key="tag"
              class="bg-tag-bg rounded-full px-1 py-0.5 shrink-0"
            >
              <UiTag :label="tag" />
            </li>
          </ul>
        </div>
      </div>
    </a>
  </article>
</template>
