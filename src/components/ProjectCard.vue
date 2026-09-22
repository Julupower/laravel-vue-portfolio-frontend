<template>
  <div class="bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col h-full">
    <div class="h-48 w-full bg-gray-100 relative overflow-hidden">
      <img 
        :src="project.image_url" 
        :alt="project.title"
        @error="handleImageError"
        class="w-full h-full object-cover"
      />
    </div>
    
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        <RouterLink 
          :to="{ name: 'project-detail', params: { id: project.id } }"
          class="hover:text-blue-600 transition-colors"
        >
          {{ project.title }}
        </RouterLink>
      </h3>
      
      <p class="text-sm text-gray-600 flex-grow mb-4">
        {{ project.summary }}
      </p>

      <div v-if="project.tech_stack && project.tech_stack.length" class="flex flex-wrap gap-1 mt-auto pt-2 border-t border-gray-50">
        <span 
          v-for="(tech, index) in project.tech_stack" 
          :key="index"
          class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle">Image Unavailable</text></svg>'
}
</script>