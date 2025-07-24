import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/saved',
      name: 'saved',
      component: () => import('../views/SavedRecipeView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchRecipeView.vue'),
    },
  ],
})

export default router
