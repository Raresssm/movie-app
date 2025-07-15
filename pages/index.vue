<script setup lang="ts">

const {
  movies,
  currentPage,
  totalPages,
  handleSearch,
} = useMovies()
</script>

<template>
  <div>
    <SearchBar @search="handleSearch" />
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <template v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie"/>
      </template>
    </div>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="(page) => { currentPage = page }"
    />
  </div>
</template>

<style scoped>
</style>