export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const url = `${config.public.NUXT_PUBLIC_BASE_URL}movie/${id}/images`
  
  try {
    const images = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${config.API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return images
  } catch (err: any) {
    console.error('TMDB Images Fetch Error:', err?.response?.status, err?.data || err?.message)
    throw createError({
      statusCode: err?.response?.status || 500,
      message: err?.data?.status_message || 'Failed to fetch movie images',
    })
  }
}) 