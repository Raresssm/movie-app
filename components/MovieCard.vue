<script setup lang="ts">
import type { SearchResult } from "~/types/types";

const props = defineProps<{
  movie: Partial<SearchResult>
}>()

// Format release year
const releaseYear = computed(() => {
  if (!props.movie.release_date) return 'N/A'
  return new Date(props.movie.release_date).getFullYear()
})

// Format rating
const rating = computed(() => {
  if (!props.movie.vote_average) return 0
  return Number(props.movie.vote_average).toFixed(1)
})

// Rating color based on score
const ratingColor = computed(() => {
  const score = props.movie.vote_average || 0
  if (score >= 8) return 'text-green-400 bg-green-400/20'
  if (score >= 6.5) return 'text-yellow-400 bg-yellow-400/20'
  if (score >= 5) return 'text-orange-400 bg-orange-400/20'
  return 'text-red-400 bg-red-400/20'
})
</script>

<template>
  <div class="group relative h-full">
    <NuxtLink :to="`/movie/${props.movie.id}`" class="block h-full">
      <!-- Movie Card -->
      <div class="movie-card bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 h-full flex flex-col">
        
        <!-- Poster Container -->
        <div class="poster-container relative overflow-hidden flex-shrink-0">
          <div v-if="props.movie.poster_path" class="relative">
            <img 
              :alt="props.movie.title" 
              :src="`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`"
              class="movie-poster w-full aspect-[2/3] object-cover" 
              loading="lazy"
            >
          </div>
          <div v-else class="w-full aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <div class="text-center text-gray-400 p-4">
              <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-xs font-medium">No Poster</p>
              <p class="text-xs opacity-75">Available</p>
            </div>
          </div>
          
          <!-- Overlay Gradient -->
          <div class="poster-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0"></div>
          
          <!-- Rating Badge -->
          <div class="absolute top-3 right-3 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/20 font-semibold text-sm flex items-center gap-1"
               :class="ratingColor">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {{ rating }}
          </div>

          <!-- Play Icon Overlay -->
          <div class="play-overlay absolute inset-0 flex items-center justify-center opacity-0">
            <div class="play-button bg-red-600/90 backdrop-blur-sm rounded-full p-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Movie Info -->
        <div class="p-4 space-y-3 flex-grow flex flex-col">
          <!-- Title -->
          <h2 class="movie-title font-bold text-white text-base md:text-lg leading-tight line-clamp-2 flex-grow">
            {{ props.movie.title }}
          </h2>
          
          <!-- Movie Details -->
          <div class="space-y-2 text-sm mt-auto">
            <!-- Release Year -->
            <div class="flex items-center gap-2 text-gray-400">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1h-2M8 7v0a1 1 0 001 1h6a1 1 0 001-1v0"/>
              </svg>
              <span>{{ releaseYear }}</span>
            </div>
            
            <!-- Vote Count -->
            <div class="flex items-center gap-2 text-gray-500 text-xs">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>{{ (props.movie.vote_count ?? 0).toLocaleString() }} votes</span>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Optimized transitions for better performance */
.movie-card {
  transition: transform 0.15s ease-out, border-color 0.15s ease-out, box-shadow 0.15s ease-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.movie-poster {
  transition: transform 0.2s ease-out;
  backface-visibility: hidden;
}

.poster-overlay,
.play-overlay {
  transition: opacity 0.15s ease-out;
}

.play-button {
  transform: scale(0.85);
  transition: transform 0.15s ease-out;
  backface-visibility: hidden;
}

.movie-title {
  transition: color 0.15s ease-out;
}

/* Simplified hover effects */
@media (hover: hover) {
  .group:hover .movie-card {
    transform: scale(1.02);
    border-color: rgba(239, 68, 68, 0.5);
    box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.1);
  }

  .group:hover .movie-poster {
    transform: scale(1.03);
  }

  .group:hover .poster-overlay {
    opacity: 1;
  }

  .group:hover .play-overlay {
    opacity: 1;
  }

  .group:hover .play-button {
    transform: scale(1);
  }

  .group:hover .movie-title {
    color: rgb(248 113 113);
  }
}

/* Mobile optimizations - no hover effects */
@media (max-width: 768px) {
  .movie-card,
  .movie-poster,
  .poster-overlay,
  .play-overlay,
  .play-button,
  .movie-title {
    transition: none;
  }
  
  /* Remove hover effects on mobile */
  .group:hover .movie-card {
    transform: none;
    border-color: rgba(55, 65, 81, 0.5);
    box-shadow: none;
  }
  
  .group:hover .movie-poster {
    transform: none;
  }
  
  .group:hover .poster-overlay,
  .group:hover .play-overlay {
    opacity: 0;
  }
  
  .group:hover .movie-title {
    color: white;
  }
}

/* Focus states for accessibility */
.group:focus-within .movie-card {
  border-color: rgba(239, 68, 68, 0.5);
  outline: 2px solid rgba(239, 68, 68, 0.3);
  outline-offset: 2px;
}
</style>