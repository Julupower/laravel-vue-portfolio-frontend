<template>
  <main class="max-w-7xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Portfolio Projects</h1>
    
    <div v-if="loading" class="text-center py-8 text-gray-500">
      Loading projects...
    </div>

    <div v-else-if="error" class="text-red-600 py-8">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :project="project" 
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'

const projects = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost/api/projects')
    if (!response.ok) throw new Error('Failed to fetch projects')
    const json = await response.json()
    projects.value = json.data || json
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>