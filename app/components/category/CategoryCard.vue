<script setup lang="ts">
  import type { Category } from '~~/types/category'
  import { rounded } from '#imports'

  defineProps<{
    category: Category
  }>()
</script>

<template>
  <article>
    <a href="" class="flex flex-col gap-2">
      <img
        src="https://placehold.co/140x190"
        alt=""
        class="w-full aspect-[3/4] object-cover rounded"
      />

      <div class="flex flex-col min-w-0">
        <h2 class="text-sm font-semibold truncate">
          {{ category.name }}
        </h2>
        <p class="text-xs text-gray-400 truncate">{{ rounded(category.viewers) }} viewers</p>
        <ul class="flex gap-2 text-xs mt-1 overflow-hidden">
          <li
            v-for="tag in category.tags"
            :key="tag"
            class="bg-tag-bg rounded-full px-1 py-0.5 shrink-0"
          >
            <UiTag :label="tag" />
          </li>
        </ul>
      </div>
    </a>
  </article>
</template>
