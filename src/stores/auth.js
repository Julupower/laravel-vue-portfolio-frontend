import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getCsrfCookie() {
      // Calls Sanctum CSRF initialization endpoint before POST requests
      await api.get('/sanctum/csrf-cookie')
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        await this.getCsrfCookie()
        await api.post('/login', credentials)
        await this.fetchUser()
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed.'
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        const response = await api.get('/user')
        this.user = response.data
      } catch (err) {
        this.user = null
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } finally {
        this.user = null
      }
    },
  },
})