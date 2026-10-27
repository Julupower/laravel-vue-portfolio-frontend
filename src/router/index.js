import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import ProjectListView from '@/views/ProjectListView.vue';
import ProjectDetailView from '@/views/ProjectDetailView.vue';
import LoginView from '@/views/LoginView.vue';
import AdminDashboardView from '@/views/AdminDashboardView.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProjectListView,
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: ProjectDetailView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView,
    meta: { requiresAuth: true }, // Protected route
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // If the user isn't loaded yet, try to fetch them via session cookie
  if (!authStore.user && to.meta.requiresAuth) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect unauthenticated users to the login page
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;