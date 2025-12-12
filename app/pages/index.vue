<script setup lang="ts">

const { genres } = useGenres();
  
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-white mb-6">
      Genres
    </h1>
  </div>

  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Genre list">
    <GenreItem
      v-for="genre in genres"
      :key="genre.id"
      :genre="genre"
    >
    {{ genre.name }}
    </GenreItem>
  </ul>
</template>
