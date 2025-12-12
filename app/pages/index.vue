<script setup lang="ts">
  import { refDebounced } from '@vueuse/core';

  
  const { genres } = useGenres();
  
  const search = ref('');
  const debouncedSearch = refDebounced(search, 300);

  const filteredGenres = computed(() => {
    if (!genres.value) return [];
    // we don't want search empty spaces to affect the search results
    const trimmedSearch = debouncedSearch.value.trim();
    if (!trimmedSearch) return genres.value;
    const query = trimmedSearch.toLowerCase();
    return genres.value.filter(genre => genre.name.toLowerCase().includes(query));
  });

</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-white mb-6">
      Genres
    </h1>
  </div>

  <UInput
      v-model="search"
      placeholder="Search genres..."
      icon="i-heroicons-magnifying-glass-20-solid"
      class="mb-6 w-full max-w-sm "
    />

  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Genre list">
    <GenreItem
      v-for="genre in filteredGenres"
      :key="genre.id"
      :genre="genre"
    >
    {{ genre.name }}
    </GenreItem>
  </ul>
</template>
