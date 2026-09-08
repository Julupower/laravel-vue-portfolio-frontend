import { defineStore } from 'pinia'
import api from '@/services/api'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getCsrfCookie() {
      await axios.get('http://localhost/sanctum/csrf-cookie', { withCredentials: true })
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        await this.getCsrfCookie()
        await axios.post('http://localhost/login', credentials, { withCredentials: true })
        await this.fetchUser()
        return true
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        // Target full path to hit API middleware
        const response = await api.get('http://localhost/api/user')
        this.user = response.data
      } catch (err) {
        this.user = null
      }
    },

    async logout() {
      try {
        await axios.post('http://localhost/logout', {}, { withCredentials: true })
      } finally {
        this.user = null
      }
    },
  },
})