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
  <div class="relative w-fit animated-gradient-border group">
    <input
      v-model="input"
      @input="onInput"
      class="transition-all duration-300 ease-in-out bg-neutral-800 text-white pl-4 pr-10 py-2 border-2 border-transparent rounded-full focus:outline-none focus:w-64 w-10 group-hover:w-64 cursor-pointer h-10 relative z-10"
      placeholder="Search..."
      type="text"
    />
    <svg class="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 text-white pointer-events-none z-20"
         fill="none" stroke="currentColor"
         stroke-width="1.5" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.85z" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<style scoped>
.animated-gradient-border {
  position: relative;
}
.animated-gradient-border:before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px; /* border thickness */
  border-radius: 9999px; /* full rounded */
  background: linear-gradient(270deg, #ff0000, #000000, #ff0000);
  background-size: 400% 400%;
  z-index: 0;
  animation: gradientMove 6s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.animated-gradient-border:hover:before,
.animated-gradient-border:focus-within:before {
  opacity: 1;
}
.animated-gradient-border input {
  position: relative;
  z-index: 1;
  background-clip: padding-box;
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>