<script setup lang="ts">
const route = useRoute();
const genreId = Number(route.params.id);

const { genre, pending, error, refresh, isNotFound } = useGenre(genreId);

const pageTitle = computed(() => 
  genre.value ? `${genre.value.name} - Genre` : 'Genre Details'
);

const pageDescription = computed(() => 
  genre.value
    ? `Explore ${genre.value.name} music genre. Discover songs and artists in the ${genre.value.name} category.`
    : 'View genre details and explore music categories.'
);

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value, 
});

</script>

<template>
  <div class="p-6">
    <LoadingState v-if="pending" message="Loading genre..." />

    <div v-else-if="isNotFound" class="text-center py-16">
      <p class="text-5xl font-bold text-gray-500 mb-4">404</p>
      <h1 class="text-2xl font-semibold text-white mb-2">Genre not found</h1>
      <p class="text-gray-400 mb-6">
        The genre you're looking for doesn't exist or has been removed.
      </p>
      <UButton to="/">Browse all genres</UButton>
    </div>

    <ErrorState v-else-if="error" message="Failed to load genre" @retry="refresh" />

    <template v-else>
      <h1 class="text-3xl font-bold text-white mb-6">Genre Details</h1>
      <GenreItem v-if="genre" :genre="genre" showDetails/>
    </template>
  </div>
</template>
