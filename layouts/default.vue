<script lang="ts" setup>
import LogoutButton from "~/components/LogoutButton.vue";
import SearchBar from "~/components/SearchBar.vue";
import { useMoviesStore } from '~/composables/useMovies';

const user = await useSupabaseUser();
const moviesStore = useMoviesStore();

function handleSearch(query: string) {
  moviesStore.searchQuery = query;
  moviesStore.fetchMovies();
}

function handleClear() {
  moviesStore.searchQuery = '';
  moviesStore.fetchMovies();
}
</script>
<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <header class="flex justify-between items-center p-4 bg-gradient-to-b from-black via-gray-900 to-transparent">
      <NuxtLink to="/"><h1 class="text-3xl font-bold text-red-600">MovieApp</h1></NuxtLink>
      <nav class="flex gap-6 items-center">
        <SearchBar
          :input="moviesStore.searchQuery"
          @update:input="moviesStore.searchQuery = $event"
          @search="handleSearch"
          @clear="handleClear"
        />
        <RouterLink v-if="!user" class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700" to="/login">Login
        </RouterLink>
        <template v-else>
          <RouterLink class="text-sm bg-blue-900 px-4 py-1 rounded hover:bg-blue-950" to="/favorites">Favorites</RouterLink>
          <LogoutButton></LogoutButton>
        </template>
      </nav>
    </header>
    <main class="p-4">
      <slot/>
    </main>

    <footer class="text-center text-gray-500 text-sm p-4 border-t border-gray-700">
      © 2025 MovieApp.
    </footer>
  </div>
</template>