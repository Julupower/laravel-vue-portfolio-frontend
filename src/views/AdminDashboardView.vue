<template>
  <div class="admin-dashboard p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <p class="text-gray-600">Manage your portfolio projects and CMS content.</p>
      </div>
      <div class="flex gap-4">
        <button 
          @click="openCreateModal"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Project
        </button>
        <button 
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Projects Table Section -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div class="p-4 border-b border-gray-200 bg-gray-50 font-semibold">
        Portfolio Projects
      </div>
      
      <div v-if="loading" class="p-6 text-center text-gray-500">
        Loading projects...
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="project in projects" :key="project.slug">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ project.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ project.slug }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="editProject(project)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
              <button @click="deleteProject(project.slug)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal for Create/Edit Project -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Project' : 'Create New Project' }}</h2>
        
        <form @submit.prevent="saveProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input v-model="form.title" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Slug</label>
            <input v-model="form.slug" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Summary / Excerpt</label>
            <textarea v-model="form.summary" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Project</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const projectStore = useProjectStore();
const router = useRouter();

const loading = ref(false);
const projects = ref([]);

// Modal & Form State
const showModal = ref(false);
const isEditing = ref(false);
const form = reactive({
  title: '',
  slug: '',
  summary: ''
});

onMounted(async () => {
  loading.value = true;
  await projectStore.fetchProjects();
  projects.value = projectStore.projects;
  loading.value = false;
});

async function handleLogout() {
  await authStore.logout();
  router.push({ name: 'login' });
}

function openCreateModal() {
  isEditing.value = false;
  form.title = '';
  form.slug = '';
  form.summary = '';
  showModal.value = true;
}

function editProject(project) {
  isEditing.value = true;
  form.title = project.title;
  form.slug = project.slug;
  form.summary = project.summary || '';
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

async function saveProject() {
  // Here we will hook into your backend mutation / API service call
  console.log('Saving project data:', form);
  showModal.value = false;
  // Refresh projects list after saving
}

async function deleteProject(slug) {
  if (confirm(`Are you sure you want to delete this project (${slug})?`)) {
    // API deletion call + store synchronization
  }
}
</script>