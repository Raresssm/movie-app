export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.public.NUXT_PUBLIC_BASE_URL}genre/movie/list`

  try {
    const genres = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return genres
  } catch (err: any) {
    console.error('TMDB Genres Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500,
      message: err?.data?.status_message || 'Failed to fetch genres',
    })
  }
}) 