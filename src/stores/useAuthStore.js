import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const isAuthenticated = computed(() => !!user.value);

    async function login(credentials) {
        loading.value = true;
        error.value = null;
        try {
            await api.get('/sanctum/csrf-cookie');
            await api.post('/api/login', credentials);
            await fetchUser();
        } catch (err) {
            error.value = err.response?.data?.message || 'Invalid credentials.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function fetchUser() {
        try {
            const response = await api.get('/api/user');
            user.value = response.data;
        } catch (err) {
            user.value = null;
        }
    }

    async function logout() {
        await api.post('/api/logout');
        user.value = null;
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        fetchUser,
        logout
    };
});