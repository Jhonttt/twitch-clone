<script setup lang="ts">
  import type { TwitchCategory } from '~~/types/category'
  import { points } from '#imports'

  const props = defineProps<{
    category: TwitchCategory
  }>()

  const categoryColor = computed(() => {
    const colors = ['#9146FF', '#E91916', '#00C8AF', '#FF6B35', '#F72585', '#4CC9F0']

    const hash = props.category.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  })
</script>

<template>
  <article>
    <a href="" class="flex flex-col gap-2">
      <div class="relative group">
        <div class="absolute inset-0 rounded" :style="{ backgroundColor: categoryColor }" />
        <div
          class="relative overflow-hidden rounded transition-transform duration-200 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
        >
          <img :src="category.box_art_url" alt="" class="w-full aspect-[3/4] object-cover" />
        </div>
      </div>

      <div class="flex flex-col min-w-0">
        <h2 class="text-sm font-semibold truncate hover:text-action-sub_bg">
          {{ category.name }}
        </h2>
        <p class="text-xs text-gray-400 truncate">
          {{ points(category.viewer_count ?? 0) }} viewers
        </p>
      </div>
    </a>
  </article>
</template>
