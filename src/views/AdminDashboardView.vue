<template>
  <div class="admin-dashboard p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p>Welcome to the protected admin area. Only authenticated users can see this.</p>
    
    <button 
      @click="handleLogout" 
      class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
  await authStore.logout();
  router.push({ name: 'login' });
}
</script>
