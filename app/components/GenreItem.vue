<script setup lang="ts">
defineProps<{
  genre: SingaGenre;
  showDetails?: boolean;
}>();
</script>

<template>
  <!-- Since we are using this component in two different contexts (a list and a detail view), we conditionally render either a `li` or a `div` based on the `showDetails` prop. -->
  <component :is="showDetails ? 'div' : 'li'">
    <NuxtLink
        v-if="!showDetails"
        :to="`/genres/${genre.id}`"
        class="flex items-center gap-3 px-5 py-4 bg-gray-800/80 rounded-xl border border-gray-700/50 hover:bg-gray-700/80 hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-all duration-200 group"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
        <UIcon name="i-heroicons-musical-note" class="w-5 h-5 text-purple-400" aria-hidden="true" />
      </div>
      <span class="text-white font-medium text-base">{{ genre.name }}</span>
    </NuxtLink>
    <div v-else class="bg-gray-800/80 rounded-2xl border border-gray-700/50 overflow-hidden">
      <div class="flex items-center gap-5 px-6 py-6 border-b border-gray-700/50">
        <div class="shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-purple-500/20 to-blue-500/20">
          <UIcon name="i-heroicons-musical-note" class="w-8 h-8 text-purple-400" aria-hidden="true" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white">{{ genre.name }}</h2>
          <p class="text-gray-400 text-sm mt-1">Genre ID: {{ genre.id }}</p>
        </div>
      </div>
      <div class="px-6 py-5 space-y-4">
        <div class="flex items-center gap-3 text-gray-300">
          <UIcon name="i-heroicons-tag" class="w-5 h-5 text-gray-500 shrink-0" aria-hidden="true" />
          <span class="text-sm">Category: <span class="text-white font-medium">Music Genre</span></span>
        </div>
        <div class="flex items-center gap-3 text-gray-300">
          <UIcon name="i-heroicons-hashtag" class="w-5 h-5 text-gray-500 shrink-0" aria-hidden="true" />
          <span class="text-sm">Resource ID: <span class="text-white font-medium">{{ genre.resource_id }}</span></span>
        </div>
      </div>
    </div>
  </component>
</template>
