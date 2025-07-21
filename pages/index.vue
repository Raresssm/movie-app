<script setup lang="ts">
import { useMoviesStore } from '~/composables/useMovies';
import SortDropdowns from '~/components/SortDropdowns.vue';
import { ref, watch } from 'vue';

const moviesStore = useMoviesStore();
const showCustomAlert = ref(false);
const alertMessage = ref('');

watch(() => moviesStore.movies, (newMovies) => {
  if (moviesStore.searchQuery && newMovies.length === 0) {
    alertMessage.value = 'No movies found for your search.';
    showCustomAlert.value = true;
    setTimeout(() => {
      showCustomAlert.value = false;
    }, 3000);
  }
}, { deep: true });
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="showCustomAlert" class="fixed left-1/2 top-8 transform -translate-x-1/2 z-50">
        <div
          class="bg-[#FF1E1E] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold flex items-center gap-2 animate-bounce">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"/>
          </svg>
          {{ alertMessage }}
        </div>
      </div>
    </transition>
    <div class="flex justify-start p-4">
      <SortDropdowns
        :model-value-type="moviesStore.sortType"
        :model-value-order="moviesStore.sortOrder"
        @update:type="moviesStore.handleSortTypeChange"
        @update:order="moviesStore.handleSortOrderChange"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <template v-for="movie in moviesStore.movies" :key="movie.id">
        <MovieCard :movie="movie"/>
      </template>
    </div>
    <Pagination
      :current-page="moviesStore.currentPage"
      :total-pages="moviesStore.totalPages"
      @update:page="(page) => { moviesStore.currentPage = page }"
    />
  </div>
</template>

<style scoped>
</style>