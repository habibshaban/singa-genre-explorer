<script setup lang="ts">
defineProps<{
  message?: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="flex flex-col gap-4" role="alert">
    <p class="text-red-400">{{ message ?? 'Something went wrong' }}</p>
    <UButton variant="outline" color="error" @click="emit('retry')" class="w-fit">
      Try again
    </UButton>
  </div>
</template>
