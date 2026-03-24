<script setup lang="ts">
  defineProps<{
    isOpen: boolean
  }>()
</script>

<template>
  <li>
    <a href="#" class="flex items-center gap-3 px-6">
      <img src="/test.png" alt="" class="rounded-full size-8" />
      <div v-if="isOpen" class="flex-col justify-center flex-1 hidden lg:flex">
        <div class="flex items-center justify-between">
          <h2 class="leading-none text-sm">Miduncy</h2>
          <div class="flex items-baseline gap-1 justify-start">
            <div class="bg-red-600 size-2 rounded-full" />
            <p class="text-sm leading-none">2.3K</p>
          </div>
        </div>
        <p class="text-sm text-text-muted leading-tight">Coding Live</p>
      </div>
    </a>
  </li>
</template>
