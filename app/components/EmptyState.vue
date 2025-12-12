<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <div class="text-gray-400" role="status">
    <p>{{ message ?? 'No data found' }}</p>
  </div>
</template>
