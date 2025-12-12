<script setup lang="ts">

  defineProps<{
    message?: string;
  }>();
  
</script>

<template>
  <div class="flex items-center gap-2 text-gray-400" role="status" aria-live="polite">
    <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin" aria-hidden="true" />
    <span>{{ message ?? 'Loading...' }}</span>
  </div>
</template>
