import { defineStore } from 'pinia'
import api from '@/services/api'

export const useProjectStore = defineStore('projects', {
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
        const response = await api.get('/projects')
        this.projects = response.data.data || response.data
      } catch (err) {
        this.error = 'Failed to load projects: ' + err.message
      } finally {
        this.loading = false
      }
    },
  },
})