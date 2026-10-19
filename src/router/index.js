import { createRouter, createWebHistory } from 'vue-router';
import ProjectListView from '@/views/ProjectListView.vue';
import ProjectDetailView from '@/views/ProjectDetailView.vue';
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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;