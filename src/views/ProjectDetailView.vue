<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

const projects = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost/api/projects')
    projects.value = await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
})
</script>

<template>
  <main class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Project Portfolio</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :project="project" 
      />
    </div>
  </main>
</template>