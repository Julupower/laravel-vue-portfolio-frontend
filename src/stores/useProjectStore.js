import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([]);
  const currentProject = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const graphqlEndpoint = '/graphql';

  // Normalizer to bridge WordPress GraphQL nodes with UI component expectations
  const normalizeProject = (node) => {
    if (!node) return null;
    return {
      slug: node.slug,
      title: node.title,
      content: node.content,
      summary: node.excerpt ? node.excerpt.replace(/<[^>]*>?/gm, '') : '', // strip HTML tags from excerpt for summary
      image_url: node.featuredImage?.node?.sourceUrl || null,
      tech_stack: node.techStack || []
    };
  };

  const getProjectBySlug = computed(() => {
    return (slug) => projects.value.find((p) => p.slug === slug);
  });

  async function fetchProjects(forceRefresh = false) {
    if (projects.value.length > 0 && !forceRefresh) return;

    loading.value = true;
    error.value = null;

    const query = `
      query GetProjects {
        projects {
          nodes {
            slug
            title
            content
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Failed to connect to GraphQL endpoint.');

      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const nodes = json.data?.projects?.nodes || [];
      projects.value = nodes.map(normalizeProject);
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

    const query = `
      query GetProjectBySlug($slug: ID!) {
        project(id: $slug, idType: SLUG) {
          slug
          title
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { slug },
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch project details.');

      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const projectData = json.data?.project;
      if (!projectData) {
        return null;
      }

      const normalized = normalizeProject(projectData);
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