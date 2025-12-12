<script setup lang="ts">

const title = 'About Us';
const description = 'Learn more about our application and what we do. Discover our mission to bring you the best music experience.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});


</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-4">
      About Us
    </h1>
    <p class="text-gray-300">
      Learn more about our application and what we do.
    </p>
  </div>
</template>
