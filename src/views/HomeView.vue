<script setup>
	import { ref, onMounted } from 'vue';
	import ProjectCard from '@/components/ProjectCard.vue';

	const projects = ref([]);

	const fetchProjects = async () => {
	  try {
	    const response = await fetch('http://localhost/api/projects');
	    const json = await response.json();
	    projects.value = json.data || json;
	  } catch (error) {
	    console.error('Failed to fetch projects:', error);
	  }
	};

	onMounted(() => {
	  fetchProjects();
	});
</script>

<template>
	<main class="container mx-auto p-6">
	  <h1 class="text-3xl font-bold mb-6">Portfolio Projects</h1>

	  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	    <ProjectCard 
	      v-for="project in projects" 
	      :key="project.id || project.slug" 
	      :project="project" 
	    />
	  </div>
	</main>
</template>