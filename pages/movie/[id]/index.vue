<script lang="ts" setup>
import type { SearchResult, VideosResponse, ImagesResponse, Video } from "~/types/types";
import SkeletonDetailCard from '~/components/SkeletonDetailCard.vue';
import TrailerModal from '~/components/TrailerModal.vue';

const route = useRoute()

const movie = ref<SearchResult | null>(null)
const loading = ref(true)
const selectedVideo = ref<Video | null>(null)
const showTrailerModal = ref(false)
const currentIndex = ref(0)
const showSlideshow = ref(false)
const slideshowImageLoading = ref(false)

const {data, error} = await useFetch<SearchResult>('/api/movie/' + route.params.id, {
  key: `movie-${route.params.id}`,
  server: false
})

const {data: videosData} = await useFetch<VideosResponse>(`/api/movie/${route.params.id}/videos`, {
  key: `videos-${route.params.id}`,
  server: false
})

const {data: imagesData} = await useFetch<ImagesResponse>(`/api/movie/${route.params.id}/images`, {
  key: `images-${route.params.id}`,
  server: false
})

watchEffect(() => {
  if (data.value) {
    movie.value = data.value
    loading.value = false
  }
})

// Get trailer videos (YouTube trailers)
const trailers = computed(() => {
  if (!videosData.value?.results) return []
  return videosData.value.results.filter(video => 
    video.site === 'YouTube' && video.type === 'Trailer'
  )
})

// Get backdrop images
const backdrops = computed(() => {
  return imagesData.value?.backdrops || []
})

function openTrailer(video: Video) {
  selectedVideo.value = video
  showTrailerModal.value = true
}

function closeTrailerModal() {
  showTrailerModal.value = false
  selectedVideo.value = null
}

function openSlideshow() {
  showSlideshow.value = true
}

function closeSlideshow() {
  showSlideshow.value = false
}

// Keyboard navigation for slideshow
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (!showSlideshow.value) return
    
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        console.log('Arrow right pressed')
        slideshowImageLoading.value = true
        console.log('Loading set to true:', slideshowImageLoading.value)
        currentIndex.value = (currentIndex.value + 1) % backdrops.value.length
        console.log('New index:', currentIndex.value)
        break
      case 'ArrowLeft':
        event.preventDefault()
        console.log('Arrow left pressed')
        slideshowImageLoading.value = true
        console.log('Loading set to true:', slideshowImageLoading.value)
        currentIndex.value = currentIndex.value === 0 
          ? backdrops.value.length - 1 
          : currentIndex.value - 1
        console.log('New index:', currentIndex.value)
        break
      case 'Escape':
        event.preventDefault()
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
  <div class="max-w-5xl mx-auto mt-8">
    <SkeletonDetailCard v-if="loading" />
    <div v-else-if="movie" class="space-y-8">
      <!-- Movie Info Section -->
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Poster with placeholder -->
        <div class="w-full md:w-1/3 aspect-[2/3] rounded overflow-hidden bg-gray-800">
          <img
            v-if="movie.poster_path"
            :alt="movie.title"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-sm">No poster available</p>
            </div>
          </div>
        </div>
        
        <!-- Movie Details -->
        <div class="flex-1">
          <h2 class="text-3xl font-bold mb-2">{{ movie.title }}</h2>
          <MovieRating :movie="movie"></MovieRating>
          <p v-if="movie.overview" class="text-gray-300 leading-relaxed mt-4">{{ movie.overview }}</p>
          <FavoriteMovie v-if="movie" :movie="movie" :readOnly="false" class="mt-4"></FavoriteMovie>
          
          <!-- Images Section - Right below favorites button -->
          <div v-if="backdrops.length > 0" class="mt-6">
            <h3 class="text-lg font-semibold mb-3">Movie Images</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              <div
                v-for="(image, index) in backdrops.slice(0, 3)"
                :key="index"
                class="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                @click="() => { currentIndex = index; openSlideshow() }"
              >
                <img
                  :src="`https://image.tmdb.org/t/p/w300${image.file_path}`"
                  :alt="`${movie.title} image ${index + 1}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <button
              v-if="backdrops.length > 3"
              @click="openSlideshow"
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View all {{ backdrops.length }} images →
            </button>
          </div>
        </div>
      </div>
      
      <!-- Trailers Section -->
      <div v-if="trailers.length > 0" class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Trailers</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="trailer in trailers.slice(0, 6)"
            :key="trailer.id"
            class="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
            @click="openTrailer(trailer)"
          >
            <div class="aspect-video bg-gray-900 relative">
              <img
                :src="`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`"
                :alt="trailer.name"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-red-600 rounded-full p-3">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-sm">{{ trailer.name }}</h4>
              <p class="text-gray-400 text-xs mt-1">{{ trailer.site }} • {{ trailer.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Trailer Modal -->
    <TrailerModal
      :video="selectedVideo"
      :is-open="showTrailerModal"
      @close="closeTrailerModal"
    />
    
    <!-- Slideshow Modal -->
    <Transition name="modal">
      <div 
        v-if="showSlideshow && backdrops.length > 0" 
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
            @click.stop="console.log('Previous clicked'); slideshowImageLoading = true; console.log('Loading set to true:', slideshowImageLoading); currentIndex = currentIndex === 0 ? backdrops.length - 1 : currentIndex - 1; console.log('New index:', currentIndex)"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <button
            @click.stop="console.log('Next clicked'); slideshowImageLoading = true; console.log('Loading set to true:', slideshowImageLoading); currentIndex = (currentIndex + 1) % backdrops.length; console.log('New index:', currentIndex)"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
          <!-- Current image -->
          <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <!-- Loading overlay -->
            <div 
              v-show="slideshowImageLoading"
              class="absolute inset-0 bg-gray-900 flex items-center justify-center z-20"
            >
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            {{ console.log('slideshowImageLoading state:', slideshowImageLoading) }}
            
            <img
              :src="`https://image.tmdb.org/t/p/original${backdrops[currentIndex].file_path}`"
              :alt="`${movie?.title} image ${currentIndex + 1}`"
              class="w-full h-full object-contain"
              @load="console.log('Image loaded'); slideshowImageLoading = false; console.log('Loading set to false:', slideshowImageLoading)"
              @error="console.log('Image error'); slideshowImageLoading = false; console.log('Loading set to false:', slideshowImageLoading)"
            />
          </div>
          
          <!-- Image counter -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {{ currentIndex + 1 }} / {{ backdrops.length }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>

</style>