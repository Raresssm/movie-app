import { defineStore } from 'pinia'
import { ref, watchEffect, watch, computed } from 'vue'
import type { SearchResult, SearchResults } from '~/types/types'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<SearchResult[] | []>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchQuery = ref('')
  const sortType = ref('popularity')
  const sortOrder = ref('desc')
  const sortBy = computed(() => `${sortType.value}.${sortOrder.value}`)

  const fetchMovies = async (page = 1, query = '', sort = 'popularity.desc') => {
    let url = `/api/movies?page=${page}`
    if (query) url += `&query=${encodeURIComponent(query)}`
    if (!query && sort) url += `&sort_by=${encodeURIComponent(sort)}`
    const { data } = await useFetch<SearchResults>(url)
    if (data.value) {
      movies.value = data.value.results
      totalPages.value = data.value.total_pages
      currentPage.value = data.value.page
    }
  }

  watchEffect(() => {
    fetchMovies(currentPage.value, searchQuery.value, sortBy.value)
  })

  function handleSearch(query: string) {
    searchQuery.value = query
    currentPage.value = 1
  }

  function handleSortTypeChange(type: string) {
    sortType.value = type
    currentPage.value = 1
  }

  function handleSortOrderChange(order: string) {
    sortOrder.value = order
    currentPage.value = 1
  }

  watch([sortType, sortOrder], () => {
    currentPage.value = 1
  })

  return {
    movies,
    currentPage,
    totalPages,
    searchQuery,
    sortType,
    sortOrder,
    sortBy,
    fetchMovies,
    handleSearch,
    handleSortTypeChange,
    handleSortOrderChange,
  }
}) 