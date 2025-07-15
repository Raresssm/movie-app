<template>
  <div class="flex justify-center items-center mt-6 space-x-4">
    <button
      class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >&laquo; Previous</button>
    <span class="text-lg font-medium text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
    <button 
      class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    > Next &raquo;</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  currentPage: number,
  totalPages: number
}>()

const emit = defineEmits(['update:page'])
</script>

<style scoped>
</style> 