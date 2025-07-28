<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useSupabaseUser } from '#imports'
import type { SearchResult } from '~/types/types'
import LoadingSpinner from "~/components/LoadingSpinner.vue";

interface Favorite {
  movie_id: number
}

const props = defineProps<{
  movie: Partial<SearchResult>
  readOnly?: boolean
}>()

const user = useSupabaseUser()
const isFavorite = ref(false)
const loading = ref(true)
const pending = ref(false)

onMounted(async () => {
  if (!user.value) {
    loading.value = false
    return
  }

  try {
    const { data, error } = await useFetch<Favorite[]>('/api/favorites')

    if (error.value) {
      console.error('Error loading favorites', error.value)
    }

    if (data.value && props.movie.id) {
      isFavorite.value = data.value.some(f => f.movie_id == props.movie.id)
    }
  } catch (err) {
    console.error('Unexpected fetch error', err)
  } finally {
    loading.value = false
  }
})

const toggleFavorite = async () => {
  if (!user.value || !props.movie.id) return

  pending.value = true

  const method = isFavorite.value ? 'DELETE' : 'POST'
  const params = isFavorite.value ? { movie_id: props.movie.id } : {}
  const body = isFavorite.value ? undefined : {
    movie_id: props.movie.id,
    movie_data: props.movie
  }

  const { error } = await useFetch('/api/favorites', {
    method,
    params,
    body
  })

  if (!error.value) {
    isFavorite.value = !isFavorite.value
  } else {
    console.error(error.value)
    alert('Something went wrong.')
  }

  pending.value = false
}
</script>
<template>
  <!-- Show loading spinner on first mount -->
  <div v-if="loading" class="flex items-center justify-center">
    <div class="w-8 h-8">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>

  <!-- Show login prompt if user is not authenticated -->
  <RouterLink 
    v-else-if="!user"
    to="/login" 
    class="group inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
    </svg>
    <span class="text-sm font-semibold whitespace-nowrap">Log in to favorite</span>
  </RouterLink>

  <!-- Show favorite toggle button -->
  <button
    v-else
    @click="toggleFavorite"
    :disabled="pending || readOnly"
    class="group inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
    :class="[
      isFavorite 
        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border border-red-500/50 hover:shadow-red-500/25' 
        : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-red-600 hover:to-red-700 text-white border border-gray-600/50 hover:border-red-500/50 hover:shadow-red-500/25',
      pending ? 'opacity-75' : ''
    ]"
  >
    <svg v-if="pending" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <svg v-else class="w-4 h-4 transition-transform duration-200" :class="isFavorite ? 'text-white scale-110' : 'group-hover:scale-110 group-hover:text-red-400'" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <span class="text-sm font-semibold whitespace-nowrap">
      <span v-if="pending">{{ isFavorite ? 'Removing...' : 'Adding...' }}</span>
      <span v-else>{{ isFavorite ? 'Favorited' : 'Add to Favorites' }}</span>
    </span>
  </button>
</template>