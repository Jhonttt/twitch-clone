<script setup lang="ts">
  const input = ref('')
</script>

<template>
  <header class="bg-bg-alt flex justify-between items-center px-8 py-3 shadow h-12">
    <div class="flex items-center justify-center gap-4">
      <NuxtLink href="/" class="flex items-center justify-center gap-3">
        <UiLogoTwitch class="size-8" />
        <p class="md:block hidden">MIDUTCH</p>
      </NuxtLink>
      <a
        href="#"
        class="hover:bg-chat-hover hover:rounded-full flex items-center justify-center size-8"
      >
        <UiMore class="fill-text-primary" />
      </a>
    </div>

    <label class="items-center justify-center px-3 min-w-0 hidden md:flex">
      <input
        v-model="input"
        type="search"
        class="bg-bg-base border border-text-muted border-r-0 rounded-l-md px-3 py-2 h-10 placeholder:text-text-muted outline-1 w-96 shrink min-w-0 hidden md:block"
        placeholder="Search"
      />
      <a :class="['group', !input ? 'cursor-not-allowed' : '']" href="#">
        <div
          class="h-10 flex items-center px-1 rounded-md sm:rounded-l-none sm:rounded-r-md md:bg-bg-input hover:bg-tag-bg-hover"
        >
          <UiSearch class="fill-text-primary size-6 md:size-8" />
        </div>
      </a>
    </label>

    <nav class="flex items-center justify-center gap-2 shrink-0">
      <a
        href=""
        class="hover:bg-chat-hover hover:rounded-full flex items-center justify-center size-8 md:hidden"
      >
        <UiSearch class="fill-text-primary size-6" />
      </a>
      <a
        href=""
        class="hover:bg-chat-hover hover:rounded-full flex items-center justify-center size-8"
      >
        <UiNotification class="fill-text-primary" />
      </a>
      <button class="bg-bg-input px-2 py-1 rounded hover:bg-tag-bg-hover">Log In</button>
      <button class="bg-[#199AFC] px-2 py-1 rounded hover:bg-[#19AFFF]">Sign Up</button>
      <a
        href=""
        class="hover:bg-chat-hover hover:rounded-full flex items-center justify-center size-8"
      >
        <UiProfile class="fill-text-primary" />
      </a>
    </nav>
  </header>
</template>
