<script setup lang="ts">
  defineProps<{
    label: string
  }>()
</script>

<template>
  <span
    class="bg-tag-bg text-tag-text rounded-full px-1.5 py-0.5 text-xs shrink-0 hover:bg-tag-bg-hover"
  >
    {{ label }}
  </span>
</template>
