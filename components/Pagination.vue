<template>
  <div class="flex justify-center items-center mt-6 space-x-4">
    <button
      class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      :disabled="displayPage === 1"
      @click="handlePageChange('prev')"
    >&laquo; Previous</button>
    <span class="text-lg font-medium text-gray-700">Page {{ displayPage }} of {{ totalPages }}</span>
    <button 
      class="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      :disabled="displayPage === totalPages"
      @click="handlePageChange('next')"
    > Next &raquo;</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps<{
  currentPage: number,
  totalPages: number
}>()

const emit = defineEmits(['update:page', 'loading'])

const clickCount = ref(0)
const clickDirection = ref<'next' | 'prev' | null>(null)
const clickTimeout = ref<NodeJS.Timeout | null>(null)

// Responsive display page that updates immediately
const displayPage = computed(() => {
  if (clickDirection.value === null) {
    return props.currentPage
  }
  
  const pageChange = clickDirection.value === 'next' ? clickCount.value : -clickCount.value
  const targetPage = props.currentPage + pageChange
  
  return Math.max(1, Math.min(props.totalPages, targetPage))
})

function handlePageChange(direction: 'next' | 'prev') {
  // Emit loading immediately for responsive UI
  emit('loading', true)
  
  // Clear existing timeout
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value)
  }
  
  // If direction changed, reset counter
  if (clickDirection.value !== direction) {
    clickCount.value = 0
    clickDirection.value = direction
  }
  
  // Increment click counter
  clickCount.value++
  
  // Wait 500ms after last click before processing
  clickTimeout.value = setTimeout(() => {
    // Calculate final target page based on click count and direction
    const pageChange = direction === 'next' ? clickCount.value : -clickCount.value
    const targetPage = props.currentPage + pageChange
    
    // Ensure target page is within bounds
    const finalPage = Math.max(1, Math.min(props.totalPages, targetPage))
    
    // Emit the final page
    emit('update:page', finalPage)
    
    // Reset counter and direction
    clickCount.value = 0
    clickDirection.value = null
    clickTimeout.value = null
  }, 500)
}
</script>

<style scoped>
</style> 