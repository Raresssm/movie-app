<script setup lang="ts">
import type { Video } from '~/types/types'

const props = defineProps<{
  video: Video | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function closeModal() {
  emit('close')
}

// Close modal when clicking outside
function handleBackdropClick(event: Event) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

// Close modal with Escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <Transition name="modal">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      @click="handleBackdropClick"
    >
      <div class="relative max-w-4xl w-full mx-4">
        <button
          @click="closeModal"
          class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            v-if="video"
            :src="`https://www.youtube.com/embed/${video.key}?autoplay=1`"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        
        <div v-if="video" class="mt-4 text-white">
          <h3 class="text-xl font-semibold">{{ video.name }}</h3>
          <p class="text-gray-300 text-sm">{{ video.site }} • {{ video.type }}</p>
        </div>
      </div>
    </div>
  </Transition>
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