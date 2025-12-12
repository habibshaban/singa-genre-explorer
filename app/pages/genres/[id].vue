<script setup lang="ts">
const route = useRoute();
const genreId = Number(route.params.id);

const { genre, pending, error, refresh } = useGenre(genreId);

</script>

<template>
  <div class="p-6">
    <LoadingState v-if="pending" message="Loading genre..." />
    <ErrorState v-else-if="error" message="Failed to load genre" @retry="refresh" />

    <template v-else>
      <h1 class="text-3xl font-bold text-white mb-6">Genre Details</h1>
      <GenreItem v-if="genre" :genre="genre" showDetails/>
    </template>
  </div>
</template>
