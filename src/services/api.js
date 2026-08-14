import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Relative path routes through Vite proxy
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api