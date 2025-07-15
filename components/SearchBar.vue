<script setup>
import { ref } from 'vue'
const input = ref('')
const emit = defineEmits(['search'])

let debounceTimeout = null
function onInput() {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    emit('search', input.value)
  }, 400)
}
</script>

<template>
  <div class="flex justify-center mb-6">
    <input
      v-model="input"
      @input="onInput"
      type="text"
      placeholder="Search movies..."
      class="border-2 border-[#FF1E1E] text-gray-800 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-[#FF1E1E] transition-all duration-300 rounded-full px-5 py-2 w-80 shadow-sm pr-10"
    />
  </div>
</template>