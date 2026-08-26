
<script setup>
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/projects'

const route = useRoute()
const projectStore = useProjectStore()
const { currentProject, loading, error } = storeToRefs(projectStore)

onMounted(() => {
  projectStore.fetchProjectById(route.params.id)
})
</script>

<template>
  <main style="padding: 2rem;">
    <RouterLink to="/" style="display: inline-block; margin-bottom: 1rem; color: #3182ce; text-decoration: none;">
      &larr; Back to Portfolio
    </RouterLink>

    <div v-if="loading">Loading project details...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>

    <article v-else-if="currentProject" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 2rem;">
      <h1 style="margin-bottom: 1rem; color: #1a202c;">{{ currentProject.title }}</h1>
      <p style="color: #4a5568; font-size: 1.1rem; line-height: 1.7;">{{ currentProject.description }}</p>
    </article>
  </main>
</template>