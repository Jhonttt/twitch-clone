<template>
  <article class="flex flex-col gap-2">
    <div class="relative group">
      <div class="absolute inset-0 rounded-md bg-bg-overlay" />
      <div class="relative overflow-hidden rounded-md">
        <UiSkeleton class="w-full aspect-video" />
      </div>
    </div>
    <div class="flex gap-3">
      <UiSkeleton class="rounded-full size-10 shrink-0" />
      <div class="flex flex-col gap-1.5 min-w-0 flex-1">
        <UiSkeleton class="h-4 w-full" />
        <UiSkeleton class="h-3 w-1/2" />
        <UiSkeleton class="h-3 w-1/3" />
        <div class="flex gap-2 mt-1">
          <UiSkeleton class="h-5 w-14 rounded-full" />
          <UiSkeleton class="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  </article>
</template>
