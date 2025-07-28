<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { GenresResponse } from '~/types/types';

const sortTypes = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'release_date', label: 'Release Date' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'primary_release_date', label: 'Primary Release Date' },
  { value: 'original_title', label: 'Original Title' },
  { value: 'vote_average', label: 'Vote Average' },
  { value: 'vote_count', label: 'Vote Count' },
];

const sortOrders = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

const props = defineProps({
  modelValueType: {
    type: String,
    required: true,
  },
  modelValueOrder: {
    type: String,
    required: true,
  },
  modelValueGenre: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:type', 'update:order', 'update:genre']);

// Fetch genres
const { data: genresData } = await useFetch<GenresResponse>('/api/genres');

function onTypeChange(event: Event) {
  emit('update:type', (event.target as HTMLSelectElement).value);
}
function onOrderChange(event: Event) {
  emit('update:order', (event.target as HTMLSelectElement).value);
}
function onGenreChange(event: Event) {
  emit('update:genre', (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="space-y-4">
    <!-- Mobile Layout (Stack vertically) -->
    <div class="md:hidden space-y-4">
      <!-- Sort By -->
      <div class="relative">
        <label class="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2">
          <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
          </svg>
          Sort By
        </label>
        <select
          class="w-full appearance-none bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 hover:bg-gray-700/80 transition-all duration-200 text-base"
          :value="modelValueType"
          @change="onTypeChange"
        >
          <option v-for="type in sortTypes" :key="type.value" :value="type.value" class="bg-gray-800 text-white py-2">
            {{ type.label }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-7">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Sort Order and Genre in a row -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Order -->
        <div class="relative">
          <label class="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
            Order
          </label>
          <select
            class="w-full appearance-none bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-3 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-gray-700/80 transition-all duration-200 text-base"
            :value="modelValueOrder"
            @change="onOrderChange"
          >
            <option v-for="order in sortOrders" :key="order.value" :value="order.value" class="bg-gray-800 text-white py-2">
              {{ order.label }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none mt-7">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        <!-- Genre -->
        <div class="relative">
          <label class="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l1 7H6l1-7zM10 11v6M14 11v6"/>
            </svg>
            Genre
          </label>
          <select
            class="w-full appearance-none bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-3 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 hover:bg-gray-700/80 transition-all duration-200 text-base"
            :value="modelValueGenre"
            @change="onGenreChange"
          >
            <option value="" class="bg-gray-800 text-white py-2">All</option>
            <option v-for="genre in genresData?.genres" :key="genre.id" :value="genre.id" class="bg-gray-800 text-white py-2">
              {{ genre.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none mt-7">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Layout (Keep horizontal) -->
    <div class="hidden md:flex gap-6">
      <!-- Sort By -->
      <div class="relative flex-1">
        <label class="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2">
          <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
          </svg>
          Sort By
        </label>
        <select
          class="w-full appearance-none bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 hover:bg-gray-700/80 transition-all duration-200"
          :value="modelValueType"
          @change="onTypeChange"
        >
          <option v-for="type in sortTypes" :key="type.value" :value="type.value" class="bg-gray-800 text-white py-2">
            {{ type.label }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-8">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Order -->
      <div class="relative flex-1">
        <label class="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
          </svg>
          Order
        </label>
        <select
          class="w-full appearance-none bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-gray-700/80 transition-all duration-200"
          :value="modelValueOrder"
          @change="onOrderChange"
        >
          <option v-for="order in sortOrders" :key="order.value" :value="order.value" class="bg-gray-800 text-white py-2">
            {{ order.label }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-8">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Genre -->
      <div class="relative flex-1">
        <label class="block text-sm font-semibold mb-2 text-gray-200 flex items-center gap-2">
          <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l1 7H6l1-7zM10 11v6M14 11v6"/>
          </svg>
          Filter by Genre
        </label>
        <select
          class="w-full appearance-none bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 hover:bg-gray-700/80 transition-all duration-200"
          :value="modelValueGenre"
          @change="onGenreChange"
        >
          <option value="" class="bg-gray-800 text-white py-2">All Genres</option>
          <option v-for="genre in genresData?.genres" :key="genre.id" :value="genre.id" class="bg-gray-800 text-white py-2">
            {{ genre.name }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-8">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom select styling */
select {
  background-image: none;
}

select:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Webkit scrollbar for select options */
select option {
  padding: 0.5rem;
}
</style> 