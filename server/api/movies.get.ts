export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const searchQuery = typeof query.query === 'string' ? query.query : ''

  let url
  if (searchQuery) {
    // Use TMDB search endpoint if a query is provided
    url = `${config.public.NUXT_PUBLIC_BASE_URL}search/movie?api_key=${config.API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(searchQuery)}`
  } else {
    // Default to popular movies
    url = `${config.public.NUXT_PUBLIC_BASE_URL}movie/popular?api_key=${config.API_KEY}&language=en-US&page=${page}`
  }

  try {
    const movies = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`, Accept: 'application/json', 'Content-Type': 'application/json',
      }
    })
    return movies
  } catch (err: any) {
    console.error('TMDB Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500, message: err?.data?.status_message || 'Failed to fetch movie data',
    })
  }
})