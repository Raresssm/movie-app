<script setup lang="ts">
import type { Image } from '~/types/types'

const props = defineProps<{
  images: Image[]
  title: string
}>()

const currentIndex = ref(0)
const isOpen = ref(false)

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prevImage() {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
}

function openSlideshow() {
  isOpen.value = true
}

function closeSlideshow() {
  isOpen.value = false
}

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) return
    
    switch (event.key) {
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        prevImage()
        break
      case 'Escape':
        closeSlideshow()
        break
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<template>
  <div v-if="images.length > 0" class="mt-8">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    
    <!-- Thumbnail grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
      <div
        v-for="(image, index) in images.slice(0, 12)"
        :key="index"
        class="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
        @click="() => { currentIndex = index; openSlideshow() }"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w300${image.file_path}`"
          :alt="`${title} image ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
    
    <!-- Fullscreen slideshow -->
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
        @click="closeSlideshow"
      >
        <div class="relative max-w-6xl w-full mx-4">
          <!-- Close button -->
          <button
            @click="closeSlideshow"
            class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close slideshow"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <!-- Navigation buttons -->
          <button
            @click.stop="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <button
            @click.stop="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
          <!-- Current image -->
          <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <img
              :src="`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`"
              :alt="`${title} image ${currentIndex + 1}`"
              class="w-full h-full object-contain"
            />
          </div>
          
          <!-- Image counter -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style> 