<script setup>
const client = useSupabaseClient()
const loading = ref(false)

const logout = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    await client.auth.signOut()
    navigateTo('/')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button 
    @click="logout" 
    :disabled="loading"
    class="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none border border-gray-600/50 hover:border-red-500/50"
  >
    <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <svg v-else class="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
    </svg>
    <span class="font-semibold">{{ loading ? 'Signing Out...' : 'Logout' }}</span>
  </button>
</template>