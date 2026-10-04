import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([]);
  const currentProject = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const apiBaseUrl = 'http://localhost/api';

  // Getters
  const getProjectBySlug = computed(() => {
    return (slug) => projects.value.find((p) => p.slug === slug);
  });

  // Actions
  async function fetchProjects(forceRefresh = false) {
    if (projects.value.length > 0 && !forceRefresh) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${apiBaseUrl}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects.');

      const json = await response.json();
      projects.value = json.data || json;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchProjectBySlug(slug) {
    // Return cached item if already available
    const cached = getProjectBySlug.value(slug);
    if (cached) {
      currentProject.value = cached;
      return cached;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${apiBaseUrl}/projects/${slug}`)

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) throw new Error('Failed to fetch project details.');

      const json = await response.json();
      currentProject.value = json.data;
      return json.data;
    } catch (err) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    projects,
    currentProject,
    loading,
    error,
    getProjectBySlug,
    fetchProjects,
    fetchProjectBySlug
  };
});