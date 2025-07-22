<script setup>
const client = useSupabaseClient()

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <button @click="logout" class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700">Logout</button>
</template>