import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { ref } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const storedSessionUser = sessionStorage.getItem('logged_user')
const logged_user = ref(storedSessionUser ? JSON.parse(storedSessionUser) : null)

// Global route guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !logged_user.value) {
    // Redirect to home if not authenticated
    next({ name: 'home' })
  } else {
    // Allow navigation
    next()
  }
})
export default router
