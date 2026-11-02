import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([]);
  const currentProject = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const apiEndpoint = '/api/projects';

  // Normalizer to bridge backend project data with UI component expectations
  const normalizeProject = (item) => {
    if (!item) return null;
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content || item.description,
      summary: item.excerpt || item.description ? (item.excerpt || item.description).replace(/<[^>]*>?/gm, '') : '',
      image_url: item.image_url || item.featured_image_url || null,
      tech_stack: item.tech_stack || []
    };
  };

  const getProjectBySlug = computed(() => {
    return (slug) => projects.value.find((p) => p.slug === slug);
  });

  async function fetchProjects(forceRefresh = false) {
    if (projects.value.length > 0 && !forceRefresh) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch projects from server.');

      const data = await response.json();
      projects.value = Array.isArray(data) ? data.map(normalizeProject) : (data.data || []).map(normalizeProject);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchProjectBySlug(slug) {
    const cached = getProjectBySlug.value(slug);
    if (cached) {
      currentProject.value = cached;
      return cached;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${apiEndpoint}/${slug}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch project details.');

      const item = await response.json();
      if (!item) {
        return null;
      }

      const normalized = normalizeProject(item);
      currentProject.value = normalized;
      return normalized;
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
    fetchProjectBySlug,
  };
});