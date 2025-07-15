export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const searchQuery = typeof query.query === 'string' ? query.query : ''
  const sortBy = typeof query.sort_by === 'string' ? query.sort_by : ''

  let url
  if (searchQuery) {
    // Use TMDB search endpoint if a query is provided
    url = `${config.public.NUXT_PUBLIC_BASE_URL}search/movie?api_key=${config.API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(searchQuery)}`
  } else {
    // Use discover endpoint for sorting
    url = `${config.public.NUXT_PUBLIC_BASE_URL}discover/movie?api_key=${config.API_KEY}&language=en-US&page=${page}`
    if (sortBy) {
      url += `&sort_by=${encodeURIComponent(sortBy)}`
    }
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