<script setup lang="ts">
defineProps<{
  genre: SingaGenre;
}>();
</script>

<template>
  <li>
    <NuxtLink
        :to="`/genres/${genre.id}`"
        class="flex items-center gap-3 px-5 py-4 bg-gray-800/80 rounded-xl border border-gray-700/50 hover:bg-gray-700/80 hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-all duration-200 group"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
        <UIcon name="i-heroicons-musical-note" class="w-5 h-5 text-purple-400" aria-hidden="true" />
      </div>
      <span class="text-white font-medium text-base">{{ genre.name }}</span>
    </NuxtLink>
  </li>
</template>
