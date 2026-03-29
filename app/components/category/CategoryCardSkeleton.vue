<template>
  <article class="flex flex-col gap-2">
    <div class="relative group">
      <div class="absolute inset-0 rounded bg-bg-overlay" />
      <div class="relative overflow-hidden rounded">
        <UiSkeleton class="w-full aspect-[3/4]" />
      </div>
    </div>

    <div class="flex flex-col gap-1.5 min-w-0">
      <UiSkeleton class="h-4 w-3/4" />
      <UiSkeleton class="h-3 w-1/2" />
    </div>
  </article>
</template>
