import { defineStore } from 'pinia'
import api from '@/services/api'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null
      try {
        // Explicitly hit the full API path
        const response = await api.get('http://localhost/api/projects')
        this.projects = response.data
      } catch (err) {
        this.error = 'Failed to load projects'
      } finally {
        this.loading = false
      }
    }
  }
})