<script setup lang="ts">
import { useMoviesStore } from '~/composables/useMovies';
import SortDropdowns from '~/components/SortDropdowns.vue';
const moviesStore = useMoviesStore();
</script>

<template>
  <div>
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