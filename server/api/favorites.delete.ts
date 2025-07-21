import { serverSupabaseClient } from '#supabase/server'
import { getAuthenticatedUser } from "../utils/getUser";

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient(event)
  const query = getQuery(event)

  const movieId = query.movie_id ? parseInt(query.movie_id as string, 10) : null

  if (!movieId) {
    throw createError({ statusCode: 400, message: 'Missing movie_id in query' })
  }

  const { error } = await client
    .from('favorites')
    .delete()
    .eq('movie_id', movieId)
    .eq('user_id', user.id)

  if (error) {
    console.error('[DELETE favorites] Supabase error:', error)
    throw createError({ statusCode: 500, message: 'Failed to delete favorite' })
  }

  return { success: true }
})