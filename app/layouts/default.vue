<template>
  <div class="flex flex-col h-screen bg-bg-base text-text-primary">
    <LayoutAppTopBar />
    <div class="flex flex-1 overflow-hidden">
      <LayoutAppSidebar />

      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
