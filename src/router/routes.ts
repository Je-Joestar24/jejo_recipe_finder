export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresGuest: true }, // Only for guests
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { requiresGuest: true }, // Only for guests
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }, // Protected
  },
  {
    path: '/saved',
    name: 'saved',
    component: () => import('@/views/SavedRecipeView.vue'),
    meta: { requiresAuth: true }, // Protected
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchRecipeView.vue'),
    meta: { requiresAuth: true }, // Protected
  },
]
