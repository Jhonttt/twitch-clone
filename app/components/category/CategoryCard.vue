<script setup lang="ts">
  import type { TwitchCategory } from '~~/types/category'
  import { points } from '#imports'
  defineProps<{
    category: TwitchCategory
  }>()
</script>

<template>
  <article>
    <a href="" class="flex flex-col gap-2">
      <img :src="category.box_art_url" alt="" class="w-full aspect-[3/4] object-cover rounded" />

      <div class="flex flex-col min-w-0">
        <h2 class="text-sm font-semibold truncate hover:text-action-sub_bg">
          {{ category.name }}
        </h2>
        <p class="text-xs text-gray-400 truncate">
          {{ points(category.viewer_count ?? 0) }} viewers
        </p>
        <!-- <ul class="flex gap-2 text-xs mt-1 overflow-hidden">
          <li
            v-for="tag in category.tags"
            :key="tag"
            class="bg-tag-bg rounded-full px-1 py-0.5 shrink-0"
          >
            <UiTag :label="tag" />
          </li>
        </ul> -->
      </div>
    </a>
  </article>
</template>
