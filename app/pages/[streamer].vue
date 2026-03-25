<script setup lang="ts">
  const route = useRoute()
</script>

<template>
  <main class="mt-4">
    <h1>{{ route.params.streamer }}</h1>
  </main>
</template>
