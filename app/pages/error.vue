<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error.statusCode || 500);
const statusMessage = computed(() => {
  if (statusCode.value === 404) return 'Page not found';
  if (statusCode.value === 500) return 'Server error';
  return props.error.statusMessage || 'Something went wrong';
});

const handleClearError = () => clearError({ redirect: '/' });

useHead({
  title: () => `${statusCode.value} - ${statusMessage.value}`,
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-6">
    <div class="text-center max-w-md">
      <p class="text-6xl font-bold text-red-500 mb-4">
        {{ statusCode }}
      </p>
      <h1 class="text-2xl font-semibold text-white mb-2">
        {{ statusMessage }}
      </h1>
      <p class="text-gray-400 mb-8">
        {{ error.message }}
      </p>
      <UButton size="lg" @click="handleClearError">
        Go back home
      </UButton>
    </div>
  </div>
</template>
