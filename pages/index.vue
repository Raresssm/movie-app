<script setup lang="ts">
import { useMoviesStore } from '~/composables/useMovies';
import SortDropdowns from '~/components/SortDropdowns.vue';
import { ref, watch, nextTick } from 'vue';
import SkeletonMovieCard from '~/components/SkeletonMovieCard.vue';

const moviesStore = useMoviesStore();
const showCustomAlert = ref(false);
const alertMessage = ref('');
const viewMode = ref('grid'); // 'grid' or 'list'

// Debounce the alert to prevent multiple rapid alerts
let alertTimeout: NodeJS.Timeout | null = null;

const showAlert = (message: string) => {
  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }
  
  alertMessage.value = message;
  showCustomAlert.value = true;
  
  alertTimeout = setTimeout(() => {
    showCustomAlert.value = false;
    alertTimeout = null;
  }, 3000);
};

watch(() => moviesStore.movies, (newMovies) => {
  if (moviesStore.searchQuery && newMovies.length === 0 && !moviesStore.loading) {
    nextTick(() => {
      showAlert('No movies found for your search.');
    });
  }
}, { flush: 'post' });

function setViewMode(mode: 'grid' | 'list') {
  viewMode.value = mode;
}

// Clear alert on cleanup
onUnmounted(() => {
  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }
});
</script>

<template>
  <div class="space-y-8">
    <!-- Alert Toast -->
    <transition name="fade">
      <div v-if="showCustomAlert" class="fixed left-1/2 top-24 transform -translate-x-1/2 z-50 px-4">
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl shadow-2xl text-base font-semibold flex items-center gap-3 animate-bounce backdrop-blur-sm border border-red-400/20">
          <div class="bg-white/20 rounded-full p-1">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </div>
          <span>{{ alertMessage }}</span>
        </div>
      </div>
    </transition>

    <!-- Page Header -->
    <div class="text-center space-y-4">
      <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
        Discover Amazing Movies
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        {{ moviesStore.searchQuery 
          ? `Search results for "${moviesStore.searchQuery}"` 
          : 'Explore thousands of movies, find your next favorite film' }}
      </p>
    </div>

    <!-- Sort Controls -->
    <div class="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-red-600 rounded-lg p-2">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-white">Filter & Sort</h2>
      </div>
      <SortDropdowns
        :model-value-type="moviesStore.sortType"
        :model-value-order="moviesStore.sortOrder"
        :model-value-genre="moviesStore.selectedGenre"
        @update:type="moviesStore.handleSortTypeChange"
        @update:order="moviesStore.handleSortOrderChange"
        @update:genre="moviesStore.handleGenreChange"
      />
    </div>

    <!-- Movies Section -->
    <div class="space-y-6">
      <!-- Movies Count & View Toggle -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 rounded-lg p-2">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-white">
            {{ moviesStore.loading ? 'Loading...' : `${moviesStore.movies.length} Movies` }}
          </h2>
        </div>
        
        <!-- View Toggle -->
        <div class="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1 border border-gray-700/50">
          <button 
            @click="setViewMode('grid')"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="viewMode === 'grid' 
              ? 'bg-red-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            <span class="hidden sm:inline">Grid</span>
          </button>
          <button 
            @click="setViewMode('list')"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="viewMode === 'list' 
              ? 'bg-red-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            <span class="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        <SkeletonMovieCard
          v-if="moviesStore.loading"
          v-for="n in 20"
          :key="`skeleton-init-${n}`"
        />
        <template v-else v-for="movie in moviesStore.movies" :key="movie.id">
          <MovieCard :movie="movie"/>
        </template>
      </div>

      <!-- List View -->
      <div v-else-if="viewMode === 'list'" class="space-y-3">
        <div v-if="moviesStore.loading" class="space-y-3">
          <div 
            v-for="n in 10" 
            :key="`skeleton-list-${n}`"
            class="bg-gradient-to-r from-gray-800/50 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 animate-pulse"
          >
            <div class="flex gap-4">
              <div class="w-16 h-24 bg-gray-700 rounded-lg flex-shrink-0"></div>
              <div class="flex-1 space-y-2">
                <div class="h-5 bg-gray-700 rounded w-3/4"></div>
                <div class="h-3 bg-gray-700 rounded w-1/2"></div>
                <div class="h-3 bg-gray-700 rounded w-2/3"></div>
                <div class="h-6 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
        <template v-else v-for="movie in moviesStore.movies" :key="`list-${movie.id}`">
          <div class="list-item bg-gradient-to-r from-gray-800/50 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
            <NuxtLink :to="`/movie/${movie.id}`" class="flex gap-4 p-4">
              <!-- Movie Poster -->
              <div class="relative flex-shrink-0">
                <div v-if="movie.poster_path" class="relative">
                  <img
                    :alt="movie.title"
                    :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`"
                    class="movie-poster-list w-16 h-24 object-cover rounded-lg shadow-md"
                    loading="lazy"
                  >
                </div>
                <div v-else class="w-16 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                  <div class="text-center text-gray-400">
                    <svg class="w-6 h-6 mx-auto mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p class="text-xs font-medium leading-tight">No Poster</p>
                  </div>
                </div>
                <!-- Rating Badge -->
                <div class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full border border-gray-900 flex items-center gap-1">
                  <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  {{ (movie.vote_average ?? 0).toFixed(1) }}
                </div>
              </div>

              <!-- Movie Info -->
              <div class="flex-1 space-y-2 min-w-0">
                <!-- Title -->
                <h3 class="movie-title-list text-lg font-bold text-white line-clamp-1 pr-2">
                  {{ movie.title }}
                </h3>

                <!-- Release Year & Rating -->
                <div class="flex items-center gap-3 text-xs text-gray-400">
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1h-2M8 7v0a1 1 0 001 1h6a1 1 0 001-1v0"/>
                    </svg>
                    <span>{{ movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A' }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ (movie.vote_count ?? 0).toLocaleString() }} votes</span>
                  </div>
                </div>

                <!-- Overview -->
                <p class="text-gray-300 text-xs line-clamp-2 leading-relaxed pr-2">
                  {{ movie.overview || 'No description available.' }}
                </p>

                <!-- Action Button -->
                <div class="flex items-center gap-2 pt-1">
                  <div class="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-medium rounded-lg shadow-md flex items-center gap-1.5">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    View Details
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </template>
      </div>

      <!-- Empty State -->
      <div v-if="!moviesStore.loading && moviesStore.movies.length === 0" class="text-center py-16">
        <div class="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-md mx-auto">
          <div class="bg-gray-700/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l1 7H6l1-7zM10 11v6M14 11v6"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">No Movies Found</h3>
          <p class="text-gray-400 mb-6">
            {{ moviesStore.searchQuery 
              ? 'Try adjusting your search terms or filters' 
              : 'No movies available at the moment' }}
          </p>
          <button 
            v-if="moviesStore.searchQuery"
            @click="moviesStore.searchQuery = ''; moviesStore.fetchMovies(1, '', moviesStore.sortBy, moviesStore.selectedGenre)"
            class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/25"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center pt-8">
      <Pagination
        :current-page="moviesStore.currentPage"
        :total-pages="moviesStore.totalPages"
        @update:page="(page) => { moviesStore.currentPage = page }"
        @loading="(loading) => { moviesStore.loading = loading }"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Optimized list view animations */
.list-item {
  transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
  contain: layout style paint;
}

.movie-poster-list,
.movie-title-list {
  transition: none; /* Remove transitions for better performance */
}

/* Only apply hover effects on devices that support hover */
@media (hover: hover) {
  .list-item:hover {
    border-color: rgba(239, 68, 68, 0.4);
    box-shadow: 0 4px 12px -2px rgba(239, 68, 68, 0.1);
  }
  
  .list-item:hover .movie-title-list {
    color: rgb(248 113 113);
  }
}

/* Mobile optimizations - no hover effects */
@media (max-width: 768px) {
  .list-item {
    transition: none;
  }
}
</style>