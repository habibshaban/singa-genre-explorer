<script setup lang="ts">
const route = useRoute();
const genreId = Number(route.params.id);

const { genre } = useGenre(genreId);

</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-white mb-6">Genre Details</h1>
    <GenreItem v-if="genre" :genre="genre" />
  </div>
</template>
