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
  <div class="group relative w-fit">
    <input
      v-model="input"
      @input="onInput"
      class="transition-all duration-300 ease-in-out bg-neutral-800 text-white pl-4 pr-10 py-2 border border-neutral-600 rounded-full focus:outline-none focus:w-64 w-10 group-hover:w-64 cursor-pointer h-10"
      placeholder="Search..."
      type="text"
    />
    <svg class="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 text-white pointer-events-none"
         fill="none" stroke="currentColor"
         stroke-width="1.5" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.85z" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
  </div>
</template>