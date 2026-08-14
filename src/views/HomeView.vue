<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const projects = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('/projects')
    projects.value = response.data.data || response.data
  } catch (err) {
    error.value = 'Failed to connect to backend API: ' + err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main style="padding: 2rem; font-family: sans-serif;">
    <h1>Project Portfolio</h1>

    <div v-if="loading">Loading projects from backend...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="projects.length === 0">No projects returned from API.</div>

    <ul v-else>
      <li v-for="project in projects" :key="project.id" style="margin-bottom: 1rem;">
        <strong>{{ project.title }}</strong>
        <p>{{ project.description }}</p>
      </li>
    </ul>
  </main>
</template>