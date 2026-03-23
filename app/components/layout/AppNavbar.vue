<script setup lang="ts"></script>

<template>
  <header class="bg-bg-alt flex justify-between items-center px-8 py-3">
    <div class="flex items-center justify-center gap-4">
      <div class="flex items-center justify-center gap-3">
        <UiLogoTwitch class="size-8" />
        <p>MIDUTCH</p>
      </div>
      <a href="#">
        <UiMore class="fill-text-primary" />
      </a>
    </div>

    <label class="flex items-center justify-center px-3">
      <input
        type="search"
        class="bg-bg-base border border-text-muted rounded-l-md px-3 py-2 w-96 h-10 placeholder:text-text-muted ring-0 focus:ring-0 outline-1"
        placeholder="Search"
      />
      <a href="#">
        <div class="h-10 rounded-r-md bg-bg-input flex items-center px-1">
          <UiSearch class="fill-text-primary size-8" />
        </div>
      </a>
    </label>

    <nav class="flex items-center justify-center gap-3">
      <UiNotification class="fill-text-primary" />
      <button class="bg-bg-input px-2 py-1 rounded">Log In</button>
      <button class="bg-[#199AFC] px-2 py-1 rounded">Sign Up</button>
      <UiProfile class="fill-text-primary" />
    </nav>
  </header>
</template>
