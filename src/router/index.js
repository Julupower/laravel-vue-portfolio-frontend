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
    meta: {
      title: 'Portfolio Projects | Laravel & Vue Full-Stack Developer',
      description: 'Explore enterprise-grade applications and full-stack projects built with Laravel, Vue 3, and Headless WordPress.',
    },
  },
  {
    path: '/projects/:slug',
    name: 'projects.show',
    component: ProjectDetailView,
    props: true,
    meta: {
      title: 'Project Details | Portfolio',
      description: 'In-depth architectural breakdown and tech stack details for this portfolio project.',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Admin Login | Portfolio',
      description: 'Restricted administrative access point.',
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView,
    meta: { 
      requiresAuth: true,
      title: 'Admin Dashboard | Portfolio',
      description: 'Manage portfolio projects and system configuration.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Page Not Found | Portfolio',
      description: 'The requested page could not be found.',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard for Authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user && to.meta.requiresAuth) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

// Global After-Each Guard for SEO Meta Management
router.afterEach((to) => {
  const defaultTitle = 'Gerry | Senior Laravel & Vue Developer Portfolio';
  document.title = to.meta.title || defaultTitle;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  const defaultDescription = 'Professional portfolio showcasing senior-level Laravel, Vue, and enterprise architecture.';
  
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', to.meta.description || defaultDescription);
  }
});

export default router;