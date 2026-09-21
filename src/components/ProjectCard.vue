<template>
  <div class="project-card border rounded-lg overflow-hidden shadow-sm bg-white">
    <!-- Featured Image with Fallback -->
    <img 
      :src="project.image_url || defaultPlaceholder" 
      :alt="project.title"
      class="w-full h-48 object-cover"
      @error="handleImageError"
    />

    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-800">{{ project.title }}</h3>
      <p class="text-gray-600 my-2">{{ project.summary }}</p>

      <!-- Tech Stack Badges -->
      <div class="flex flex-wrap gap-2 mt-4">
        <span 
          v-for="(tech, index) in project.tech_stack" 
          :key="index"
          class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

// Reliable SVG Data URL fallback to eliminate network dependency
const defaultPlaceholder = ref(
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" fill="%2364748b">No Image Available</text></svg>'
)

const handleImageError = (event) => {
  event.target.src = defaultPlaceholder.value
}
</script>