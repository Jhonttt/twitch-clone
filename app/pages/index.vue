<script setup lang="ts">
  const { isOpen, categories } = useChannelsStore()
  const { data, status, error } = await useFetch('/api/streams')
  const streams = computed(() => data.value?.data ?? [])
</script>

<template>
  <main class="mt-4">
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Error</p>
    <div v-else>
      <StreamCards
        headline="Live channel"
        text="we think you'll like"
        :streams="streams"
        :is-open="isOpen"
      />
      <CategoryCards
        headline="Categories"
        text="we think you'll like"
        :categories="categories"
        :is-open="isOpen"
      />
    </div>
  </main>
</template>
