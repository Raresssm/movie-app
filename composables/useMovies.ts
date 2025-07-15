import { ref, watchEffect } from 'vue'
import type { SearchResult, SearchResults } from '~/types/types'

export function useMovies() {
  const movies = ref<SearchResult[] | []>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchQuery = ref('')

  const fetchMovies = async (page = 1, query = '') => {
    let url = `/api/movies?page=${page}`
    if (query) url += `&query=${encodeURIComponent(query)}`
    const { data } = await useFetch<SearchResults>(url)
    if (data.value) {
      movies.value = data.value.results
      totalPages.value = data.value.total_pages
      currentPage.value = data.value.page
    }
  }

  watchEffect(() => {
    fetchMovies(currentPage.value, searchQuery.value)
  })

  function handleSearch(query: string) {
    searchQuery.value = query
    currentPage.value = 1
  }

  return {
    movies,
    currentPage,
    totalPages,
    handleSearch,
  }
} 