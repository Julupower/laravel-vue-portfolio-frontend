<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjectStore } from '@/stores/useProjectStore';
import { storeToRefs } from 'pinia';
import ProjectCard from '@/components/ProjectCard.vue';

const store = useProjectStore();
const { projects, loading, error } = storeToRefs(store);

// Local state for search query and selected tech filter
const searchQuery = ref('');
const selectedTech = ref('All');

// Fetch projects on component mount if not already loaded
onMounted(async () => {
  await store.fetchProjects();
});

// Extract a unique list of all technologies used across projects for filter options
const availableTechs = computed(() => {
  const techs = new Set();
  projects.value.forEach((project) => {
    if (project.tech_stack && Array.isArray(project.tech_stack)) {
      project.tech_stack.forEach((tech) => techs.add(tech));
    }
  });
  return ['All', ...Array.from(techs)];
});

// Filtered projects computed property for sub-millisecond client-side filtering
const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesTech = 
      selectedTech.value === 'All' || 
      (project.tech_stack && project.tech_stack.includes(selectedTech.value));

    return matchesSearch && matchesTech;
  });
});
</script>

<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Portfolio Projects</h1>
        <p class="mt-2 text-sm text-gray-600">
          Explore enterprise-grade applications built with Laravel, Vue 3, and Headless WordPress.
        </p>
      </div>
    </div>

    <!-- Controls Bar: Search & Tech Stack Filter -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <!-- Search Input -->
      <div class="w-full md:w-1/3">
        <label for="search" class="sr-only">Search projects</label>
        <div class="relative">
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by title or keyword..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <!-- Tech Stack Filter Badges -->
      <div class="w-full md:w-auto flex flex-wrap gap-2 items-center">
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Filter Tech:</span>
        <button
          v-for="tech in availableTechs"
          :key="tech"
          @click="selectedTech = tech"
          :class="[
            'px-3 py-1 text-xs font-medium rounded-full transition-colors border',
            selectedTech === tech
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          ]"
        >
          {{ tech }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500 text-lg">Loading portfolio projects...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
      <p>{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredProjects.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm">
      <p class="text-gray-500 text-base">No projects match your search or filter criteria.</p>
    </div>

    <!-- Project Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.slug"
        :project="project"
      />
    </div>
  </div>
</template>