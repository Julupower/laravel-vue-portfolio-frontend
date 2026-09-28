import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects.index',
      component: ProjectsView,
    },
    {
      path: '/projects/:slug',
      name: 'projects.show',
      component: () => import('@/views/ProjectShowView.vue'),
      props: true,
    },
  ],
})

export default router