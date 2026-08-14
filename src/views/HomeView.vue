<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
const { projects, loading, error } = storeToRefs(projectStore)

onMounted(() => {
  projectStore.fetchProjects()
})
</script>

<template>
  <main style="padding: 2rem;">
    <h1 style="margin-bottom: 1.5rem;">Project Portfolio</h1>

    <div v-if="loading">Loading projects from backend...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="projects.length === 0">No projects available.</div>

    <ul v-else style="list-style: none; padding: 0;">
      <li 
        v-for="project in projects" 
        :key="project.id" 
        style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);"
      >
        <h2 style="margin-bottom: 0.5rem; color: #1a202c;">{{ project.title }}</h2>
        <p style="color: #4a5568;">{{ project.description }}</p>
      </li>
    </ul>
  </main>
</template>