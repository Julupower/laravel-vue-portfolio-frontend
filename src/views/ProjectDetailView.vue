<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const route = useRoute()
const projectsStore = useProjectsStore()
const project = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    // If projects aren't loaded yet, fetch them
    if (projectsStore.projects.length === 0) {
      await projectsStore.fetchProjects()
    }
    
    // Find the specific project by route parameter
    const found = projectsStore.projects.find(p => p.id === parseInt(route.params.id))
    if (found) {
      project.value = found
    } else {
      error.value = 'Project not found.'
    }
  } catch (err) {
    error.value = 'Failed to load project details.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main style="padding: 2rem;">
    <div v-if="loading">Loading project details...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    
    <article v-else-if="project">
      <h1 style="margin-bottom: 1rem;">{{ project.title }}</h1>
      <p style="color: #4a5568; line-height: 1.6;">{{ project.description }}</p>
    </article>
  </main>
</template>