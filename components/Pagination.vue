<template>
  <div class="flex items-center justify-center gap-4">
    <!-- Previous Button -->
    <button
      class="flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-red-500/20 transform hover:scale-105 active:scale-95"
      :disabled="displayPage === 1"
      @click="handlePageChange('prev')"
    >
      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span class="hidden sm:inline">Previous</span>
      <span class="sm:hidden">Prev</span>
    </button>
    
    <!-- Page Info -->
    <div class="flex items-center gap-4">
      <!-- Desktop: Show page numbers -->
      <div class="hidden md:flex items-center gap-2">
        <template v-if="totalPages <= 7">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="handlePageJump(page)"
            class="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-all duration-200"
            :class="page === displayPage 
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25' 
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30'"
          >
            {{ page }}
          </button>
        </template>
        <template v-else>
          <!-- First page -->
          <button
            v-if="displayPage > 3"
            @click="handlePageJump(1)"
            class="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30 transition-all duration-200"
          >
            1
          </button>
          
          <span v-if="displayPage > 4" class="text-gray-500 px-1">...</span>
          
          <!-- Visible pages around current -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="handlePageJump(page)"
            class="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-all duration-200"
            :class="page === displayPage 
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25' 
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30'"
          >
            {{ page }}
          </button>
          
          <span v-if="displayPage < totalPages - 3" class="text-gray-500 px-1">...</span>
          
          <!-- Last page -->
          <button
            v-if="displayPage < totalPages - 2"
            @click="handlePageJump(totalPages)"
            class="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30 transition-all duration-200"
          >
            {{ totalPages }}
          </button>
        </template>
      </div>

      <!-- Mobile & Tablet: Show current page info -->
      <div class="md:hidden bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 px-4 py-2 rounded-xl">
        <div class="text-center">
          <div class="text-lg font-bold text-white">{{ displayPage }}</div>
          <div class="text-xs text-gray-400">of {{ totalPages }}</div>
        </div>
      </div>
    </div>
    
    <!-- Next Button -->
    <button 
      class="flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-red-500/20 transform hover:scale-105 active:scale-95"
      :disabled="displayPage === totalPages"
      @click="handlePageChange('next')"
    >
      <span class="hidden sm:inline">Next</span>
      <span class="sm:hidden">Next</span>
      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
  
  <!-- Page Info Text (Mobile) -->
  <div class="hidden text-center mt-3">
    <p class="text-gray-400 text-sm">
      Page {{ displayPage }} of {{ totalPages }}
    </p>
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

// Visible page numbers around current page
const visiblePages = computed(() => {
  const current = displayPage.value
  const total = props.totalPages
  const pages = []
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show pages around current page
    const start = Math.max(1, current - 2)
    const end = Math.min(total, current + 2)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
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

function handlePageJump(page: number) {
  if (page === props.currentPage) return
  
  emit('loading', true)
  emit('update:page', page)
}
</script>

<style scoped>
/* Ensure smooth transitions */
button {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* Mobile touch optimization */
@media (max-width: 768px) {
  button {
    min-height: 44px; /* Minimum touch target size */
  }
}
</style> 