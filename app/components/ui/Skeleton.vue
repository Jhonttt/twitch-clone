<script setup lang="ts">
  defineProps<{
    class?: string
  }>()
</script>

<template>
  <div :class="['animate-pulse bg-bg-overlay rounded', $props.class]" />
</template>
