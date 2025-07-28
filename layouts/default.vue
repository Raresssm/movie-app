<script lang="ts" setup>
import LogoutButton from "~/components/LogoutButton.vue";
import SearchBar from "~/components/SearchBar.vue";
import { useMoviesStore } from '~/composables/useMovies';

const user = await useSupabaseUser();
const moviesStore = useMoviesStore();
const isMobileMenuOpen = ref(false);

function handleSearch(query: string) {
  moviesStore.searchQuery = query;
  moviesStore.fetchMovies(1, query, moviesStore.sortBy, moviesStore.selectedGenre);

  // Navigate to home page if not already there
  const route = useRoute()
  if (route.path !== '/') {
    navigateTo('/')
  }
  
  // Close mobile menu after search
  isMobileMenuOpen.value = false;
}

function handleClear() {
  moviesStore.searchQuery = '';
  moviesStore.fetchMovies(1, '', moviesStore.sortBy, moviesStore.selectedGenre);
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  isMobileMenuOpen.value = false;
});
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans">
    <header class="bg-gradient-to-r from-black/90 via-gray-900/95 to-black/90 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-30">
      <!-- Desktop Header -->
      <div class="hidden md:flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <NuxtLink to="/" @click="handleClear" class="group">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300">
            🎬 MovieApp
          </h1>
        </NuxtLink>
        
        <nav class="flex gap-6 items-center">
          <SearchBar
            :input="moviesStore.searchQuery"
            @search="handleSearch"
            @clear="handleClear"
          />
          <template v-if="!user">
            <RouterLink 
              class="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95"
              to="/login"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              <span class="font-semibold">Log In</span>
            </RouterLink>
            <RouterLink 
              class="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 active:scale-95"
              to="/register"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              <span class="font-semibold">Sign Up</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink 
              class="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 active:scale-95"
              to="/favorites"
            >
              <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="font-semibold">Favorites</span>
            </RouterLink>
            <LogoutButton />
          </template>
        </nav>
      </div>

      <!-- Mobile Header -->
      <div class="md:hidden flex justify-between items-center px-4 py-4">
        <NuxtLink to="/" @click="handleClear" class="group">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300">
            🎬 MovieApp
          </h1>
        </NuxtLink>
        
        <!-- Mobile Hamburger Button -->
        <button 
          @click="toggleMobileMenu"
          class="flex flex-col justify-center items-center w-10 h-10 space-y-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border border-gray-600"
          aria-label="Toggle mobile menu"
        >
          <span 
            class="block w-5 h-0.5 bg-white transition-all duration-300"
            :class="{ 'rotate-45 translate-y-1.5': isMobileMenuOpen }"
          ></span>
          <span 
            class="block w-5 h-0.5 bg-white transition-all duration-300"
            :class="{ 'opacity-0': isMobileMenuOpen }"
          ></span>
          <span 
            class="block w-5 h-0.5 bg-white transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-1.5': isMobileMenuOpen }"
          ></span>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="fixed inset-0 bg-black/90 z-40 md:hidden"
          @click="closeMobileMenu"
        ></div>
      </transition>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-transform duration-300"
        leave-active-class="transition-transform duration-300"
        enter-from-class="transform -translate-x-full"
        leave-to-class="transform -translate-x-full"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="fixed left-0 top-0 w-80 h-screen bg-black z-50 md:hidden"
        >
          <!-- Mobile Menu Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 class="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Menu</h2>
            <button 
              @click="closeMobileMenu"
              class="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
              aria-label="Close mobile menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Mobile Menu Content -->
          <div class="p-6 space-y-8 max-w-sm mx-auto">
            <!-- Mobile Search -->
            <div class="w-full">
              <label class="block text-sm font-medium mb-3 text-gray-300">🔍 Search Movies</label>
              <SearchBar
                :input="moviesStore.searchQuery"
                @search="handleSearch"
                @clear="handleClear"
              />
            </div>

            <!-- Mobile Navigation Links -->
            <nav class="space-y-4">
              <RouterLink 
                to="/" 
                @click="closeMobileMenu"
                class="flex items-center gap-3 text-lg hover:text-red-400 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
              >
                🏠 Home
              </RouterLink>
              
              <template v-if="user">
                <RouterLink 
                  to="/favorites" 
                  @click="closeMobileMenu"
                  class="flex items-center gap-3 text-lg hover:text-yellow-400 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Favorites
                </RouterLink>
                <div class="pt-2">
                  <LogoutButton />
                </div>
              </template>
              
              <template v-else>
                <RouterLink 
                  to="/login" 
                  @click="closeMobileMenu"
                  class="flex items-center gap-3 justify-center text-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  Log In
                </RouterLink>
                <RouterLink 
                  to="/register" 
                  @click="closeMobileMenu"
                  class="flex items-center gap-3 justify-center text-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 font-medium shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                  Sign Up
                </RouterLink>
              </template>
            </nav>
          </div>
        </div>
      </transition>
    </header>

    <main class="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <slot/>
    </main>

    <footer class="text-center text-gray-400 text-sm py-8 border-t border-gray-800/50 bg-gradient-to-r from-black/50 to-gray-900/50">
      <div class="max-w-7xl mx-auto px-4">
        <p class="mb-2">© 2025 MovieApp - Your Ultimate Movie Discovery Platform</p>
        <p class="text-xs text-gray-500">Built with ❤️ for movie enthusiasts</p>
      </div>
    </footer>
  </div>
</template>