<script setup lang="ts">
  import type { TwitchCategory } from '~~/types/category'
  import type { AsyncDataRequestStatus } from '#app'
  const store = useChannelsStore()

  const props = defineProps<{
    headline: string
    text: string
    categories: TwitchCategory[]
    isOpen: boolean
    status?: AsyncDataRequestStatus
  }>()

  const windowWidth = ref(1280)

  const skeletonCount = computed(() => {
    if (props.isOpen) {
      return 10
    }
    return 12
  })

  const cols = computed(() => {
    const width = windowWidth.value
    if (props.isOpen) {
      if (width >= 1280) return 10
      if (width >= 1024) return 8
      if (width >= 768) return 6
      if (width >= 640) return 4
      return 2
    } else {
      if (width >= 1280) return 12
      if (width >= 1024) return 10
      if (width >= 768) return 8
      if (width >= 640) return 4
      return 2
    }
  })

  const navCols = computed(() => {
    const width = windowWidth.value
    if (props.isOpen) {
      if (width >= 1280) return 5
      if (width >= 1024) return 4
      if (width >= 768) return 4
      if (width >= 640) return 3
      return 2
    } else {
      if (width >= 1280) return 5
      if (width >= 1024) return 5
      if (width >= 768) return 4
      if (width >= 640) return 3
      return 2
    }
  })

  const showAll = ref(false)

  const onResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  const visibleCategories = computed(() => {
    const limit = showAll.value ? cols.value * 2 : cols.value
    return props.categories.slice(0, limit)
  })

  const visibleNavCategories = computed(() => {
    return store.navCategories.slice(0, navCols.value)
  })
</script>

<template>
  <section>
    <header class="font-semibold mb-2">
      <p>
        {{ headline }} <span class="text-[#199AFC]">{{ text }}</span>
      </p>
    </header>
    <div
      :class="[
        'grid gap-x-2 gap-y-5 mr-4 mb-3',
        props.isOpen
          ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'
          : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12',
      ]"
    >
      <template v-if="props.status === 'pending' || props.status === 'idle'">
        <CategoryCardSkeleton v-for="n in skeletonCount" :key="n" />
      </template>
      <template v-else>
        <CategoryCard
          v-for="category in visibleCategories"
          :key="category.id"
          :category="category"
        />
      </template>
    </div>
    <footer
      class="flex gap-6 justify-between mr-4 items-center pr-4"
      :class="[
        'grid gap-x-2 gap-y-5 mr-4 mb-3',
        props.isOpen
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5',
      ]"
    >
      <CategoryNav
        v-for="nav in visibleNavCategories"
        :key="nav.id"
        :nav-categorie="nav"
        :is-open="props.isOpen"
      />
    </footer>
  </section>
</template>
