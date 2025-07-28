<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  input: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['search', 'clear', 'update:input'])

const input = ref(props.input)
const isFocused = ref(false)

watch(() => props.input, (val) => {
  input.value = val
})

// Sync input with store when it changes
watch(input, (val) => {
  // Don't emit on every keystroke - only when explicitly triggered
})

// No automatic search - only manual via submit button

const canSubmit = computed(() => input.value.length >= 3)

function onSubmit() {
  if (canSubmit.value) {
    emit('search', input.value)
  }
}

function onEnterKey() {
  if (canSubmit.value) {
    emit('search', input.value)
  }
}

function onClear() {
  input.value = ''
  emit('clear')
}

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}
</script>

<template>
  <div class="relative">
    <!-- Desktop Search -->
    <div class="hidden md:flex items-center group">
      <div class="relative">
        <input
          v-model="input"
          class="transition-all duration-300 ease-in-out bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white pl-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 focus:bg-gray-800 hover:bg-gray-800/90 placeholder-gray-400"
          :class="[
            isFocused || input.length > 0 ? 'w-80 pr-20' : 'w-48 pr-12',
            canSubmit ? 'ring-1 ring-red-500/30' : ''
          ]"
          placeholder="Search movies..."
          type="text"
          @keydown.enter="onEnterKey"
          @focus="onFocus"
          @blur="onBlur"
        />
        
        <!-- Search Button -->
        <button
          type="button"
          :disabled="!canSubmit"
          @click="onSubmit"
          class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
          :class="[
            canSubmit 
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg hover:shadow-red-500/25 transform hover:scale-110' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed',
            input.length > 0 ? 'right-12' : 'right-2'
          ]"
          aria-label="Submit search"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.85z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Clear Button -->
        <button
          v-if="input.length > 0"
          type="button"
          @click="onClear"
          class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
          aria-label="Clear search"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Search -->
    <div class="md:hidden w-full">
      <div class="relative">
        <input
          v-model="input"
          class="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white pl-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 focus:bg-gray-800 placeholder-gray-400 text-base"
          :class="[
            canSubmit ? 'ring-1 ring-red-500/30' : '',
            input.length > 0 ? 'pr-24' : 'pr-14'
          ]"
          placeholder="Search for movies..."
          type="text"
          @keydown.enter="onEnterKey"
        />
        
        <!-- Search Button -->
        <button
          type="button"
          :disabled="!canSubmit"
          @click="onSubmit"
          class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
          :class="[
            canSubmit 
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg active:scale-95' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed',
            input.length > 0 ? 'right-12' : 'right-2'
          ]"
          aria-label="Submit search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.85z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Clear Button -->
        <button
          v-if="input.length > 0"
          type="button"
          @click="onClear"
          class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-200 active:scale-95"
          aria-label="Clear search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom focus and hover effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Smooth transitions for width changes */
input {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              background-color 0.2s ease,
              border-color 0.2s ease;
}
</style>