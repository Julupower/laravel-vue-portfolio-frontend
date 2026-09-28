<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const project = ref(null)
const loading = ref(true)
const error = ref(null)

const getImageUrl = (path) => {
  if (!path) return 'https://picsum.photos/1200/600'
  if (path.startsWith('http')) return path
  return `http://localhost/${path.replace(/^\//, '')}`
}

const fetchProject = async () => {
  try {
    loading.value = true
    const response = await fetch(`http://localhost/api/projects/${props.slug}`)
    
    if (!response.ok) {
      throw new Error(`Project not found (HTTP ${response.status})`)
    }
    
    const json = await response.json()
    project.value = json.data || json
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProject()
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="loading" class="text-gray-500 text-center py-12">
      Loading project details...
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
      <p class="font-bold">Unable to load project</p>
      <p class="text-sm">{{ error }}</p>
    </div>

    <article v-else-if="project" class="space-y-6">
      <header class="border-b pb-4">
        <h1 class="text-3xl font-bold text-gray-900">{{ project.title }}</h1>
        <p class="text-sm text-gray-500 mt-1">Slug: {{ project.slug }}</p>
      </header>

      <!-- Featured Image Banner -->
      <div class="w-full h-80 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
        <img 
          :src="getImageUrl(project.image_path)" 
          :alt="project.title" 
          class="w-full h-full object-cover object-center"
        />
      </div>

      <section class="prose max-w-none text-gray-700 leading-relaxed text-lg">
        <p>{{ project.description }}</p>
      </section>

      <section v-if="project.tech_stack" class="flex flex-wrap gap-2 pt-4">
        <span 
          v-for="tech in project.tech_stack" 
          :key="tech"
          class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
        >
          {{ tech }}
        </span>
      </section>

      <footer class="flex gap-4 pt-6 border-t">
        <a 
          v-if="project.github_url" 
          :href="project.github_url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition"
        >
          View Source on GitHub
        </a>
        <a 
          v-if="project.live_url" 
          :href="project.live_url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-500 transition"
        >
          Visit Live Application
        </a>
      </footer>
    </article>
  </div>
</template>