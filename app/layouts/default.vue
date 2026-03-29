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

<style>
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0e0e10;
  }

  ::-webkit-scrollbar-thumb {
    background: #4b4d56;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6a6c78;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #4b4d56 #0e0e10;
  }
</style>
