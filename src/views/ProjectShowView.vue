<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/useProjectStore'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const { loading, error } = storeToRefs(projectStore)
const project = ref(null)

const loadProject = async () => {
  const data = await projectStore.fetchProjectBySlug(route.params.slug)
  
  if (!data) {
    // Redirect to 404 handler if store returns null
    router.replace({ name: 'not-found' })
  } else {
    project.value = data
  }
}

onMounted(() => {
  loadProject()
})
</script>

<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <div v-if="loading" class="text-gray-500 text-center py-8">
      Loading project details...
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-8">
      {{ error }}
    </div>

    <div v-else-if="project" class="bg-white border rounded-lg overflow-hidden shadow-sm p-6">
      <router-link to="/" class="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Projects</router-link>
      <h1 class="text-3xl font-bold mb-4">{{ project.title }}</h1>
      <p class="text-gray-700 leading-relaxed mb-6">{{ project.description }}</p>
      
      <div v-if="project.tech_stack" class="flex flex-wrap gap-2 mb-6">
        <span 
          v-for="tech in project.tech_stack" 
          :key="tech"
          class="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>