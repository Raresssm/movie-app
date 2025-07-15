<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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
});

const emit = defineEmits(['update:type', 'update:order']);

function onTypeChange(event: Event) {
  emit('update:type', (event.target as HTMLSelectElement).value);
}
function onOrderChange(event: Event) {
  emit('update:order', (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="flex gap-4">
    <div class="relative">
      <label class="block text-sm font-medium mb-1 text-gray-300">Sort By</label>
      <select
        class="appearance-none rounded border border-gray-700 px-2 py-1 bg-gray-800 text-gray-200 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors duration-150 hover:bg-gray-700 w-full pr-8"
        :value="modelValueType"
        @change="onTypeChange"
      >
        <option v-for="type in sortTypes" :key="type.value" :value="type.value" class="bg-gray-800 text-black disabled:bg-gray-700 disabled:text-gray-500">
          {{ type.label }}
        </option>
      </select>
      <span class="pointer-events-none absolute right-2 top-8 text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </span>
    </div>
    <div class="relative">
      <label class="block text-sm font-medium mb-1 text-gray-300">Order</label>
      <select
        class="appearance-none rounded border border-gray-700 px-2 py-1 bg-gray-800 text-gray-200 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors duration-150 hover:bg-gray-700 w-full pr-8"
        :value="modelValueOrder"
        @change="onOrderChange"
      >
        <option v-for="order in sortOrders" :key="order.value" :value="order.value" class="bg-gray-800 text-black disabled:bg-gray-700 disabled:text-gray-500">
          {{ order.label }}
        </option>
      </select>
      <span class="pointer-events-none absolute right-2 top-8 text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
select {
  min-width: 140px;
}
</style> 