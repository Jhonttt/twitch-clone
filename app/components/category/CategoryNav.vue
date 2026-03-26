<script setup lang="ts">
  import type { NavCategory } from '~~/types/category'

  import { Gaming, Microphone, Helmet, Creative, Trophy } from '@/components/ui/index'

  const iconMap = {
    Gaming,
    Helmet,
    Microphone,
    Creative,
    Trophy,
  }

  defineProps<{
    navCategorie: NavCategory
  }>()
</script>

<template>
  <article class="w-full">
    <a
      href=""
      class="relative flex items-center gap-1 bg-[#199AFC] pr-20 px-3 rounded py-2 hover:bg-[#19AFFF]"
    >
      <h2 class="text-lg font-semibold truncate">
        {{ navCategorie.name }}
      </h2>
      <component
        :is="iconMap[navCategorie.icon]"
        class="absolute right-2 top-1/2 -translate-y-1/2 size-16 shrink-0 fill-white"
        aria-hidden="true"
        focusable="false"
      />
    </a>
  </article>
</template>
