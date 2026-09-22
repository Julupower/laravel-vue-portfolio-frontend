<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <!-- Back Navigation Link -->
    <RouterLink 
      to="/projects" 
      class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 transition-colors"
    >
      &larr; Back to Portfolio Projects
    </RouterLink>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500 text-lg">Loading project details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
      <p>{{ error }}</p>
    </div>

    <!-- Project Details Card -->
    <article v-else-if="project" class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <!-- Media Header -->
      <div class="w-full h-80 bg-gray-100 relative">
        <img 
          :src="project.image_url" 
          :alt="project.title"
          @error="handleImageError"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Main Content Container -->
      <div class="p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ project.title }}</h1>
        
        <!-- Summary Callout -->
        <p class="text-lg text-gray-600 italic mb-6 border-l-4 border-blue-500 pl-4 bg-gray-50 py-2">
          {{ project.summary }}
        </p>

        <!-- Tech Stack Badges -->
        <div v-if="project.tech_stack && project.tech_stack.length" class="mb-8">
          <h2 class="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Technologies Used</h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(tech, index) in project.tech_stack" 
              :key="index"
              class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Full Content Body -->
        <div class="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-6">
          {{ project.content }}
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const project = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchProject = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`http://localhost/api/projects/${props.id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Project not found.')
      }
      throw new Error('Failed to fetch project details.')
    }

    const json = await response.json()
    project.value = json.data || json
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle">Image Unavailable</text></svg>'
}

onMounted(() => {
  fetchProject()
})
</script>