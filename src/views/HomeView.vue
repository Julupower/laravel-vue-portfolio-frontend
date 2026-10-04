<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '@/stores/useProjectStore';
import ProjectCard from '@/components/ProjectCard.vue';

const projectStore = useProjectStore();
const { projects, loading, error } = storeToRefs(projectStore);

onMounted(() => {
  projectStore.fetchProjects();
});
</script>

<template>
  <main class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Portfolio Projects</h1>

    <div v-if="loading" class="text-gray-500 text-center py-8">
      Loading projects...
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-8">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id || project.slug" 
        :project="project" 
      />
    </div>
  </main>
</template>