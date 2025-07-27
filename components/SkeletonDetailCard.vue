<template>
  <div class="max-w-5xl mx-auto mt-8">
    <div class="flex flex-col md:flex-row gap-6">
      <!--poster-->
      <div class="skeleton-poster rounded w-full md:w-1/3 aspect-[2/3]"></div>
      <div class="flex-1 space-y-4 py-1">
        <!--titlu-->
        <div class="h-8 skeleton-title rounded w-1/2"></div>
        <!--rating-->
        <div class="h-4 skeleton-title rounded w-1/4"></div>
        <!--overview rand-->
        <div class="space-y-2">
          <div class="h-4 skeleton-title rounded"></div>
          <div class="h-4 skeleton-title rounded w-5/6"></div>
          <div class="h-4 skeleton-title rounded w-3/4"></div>
        </div>
        <!--favorites-->
        <div class="h-10 skeleton-title rounded w-1/3 mt-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.skeleton-poster {
  background: #333; 
  animation: pulse-bg 1.2s infinite;
}
.skeleton-title { 
  background: #333; 
  animation: pulse-bg 1.2s infinite;
}
@keyframes pulse-bg {
  0%   { background-color: #2a2a2a; }
  50%  { background-color: #333; }
  100% { background-color: #2a2a2a; }
}
</style> 