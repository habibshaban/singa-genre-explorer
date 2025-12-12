<script setup lang="ts">
const route = useRoute();
const genreId = Number(route.params.id);

</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-white mb-6">Genre Details: {{ genreId }}</h1>
  </div>
</template>
