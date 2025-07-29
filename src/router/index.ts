import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { ref } from 'vue'
import { useNotifStore } from '@/stores/notifications'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const storedSessionUser = sessionStorage.getItem('logged_user')
const logged_user = ref(storedSessionUser ? JSON.parse(storedSessionUser) : null)

// Global route guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const notifStore = useNotifStore()
  const name = `${to.name?.toString()} Page`
  notifStore.showMessage(name)

  if (requiresAuth && !logged_user.value) {
    // Redirect to home if not authenticated
    return next({ name: 'home' })
  }

  // If route requires guest and user IS logged in
  if (to.meta.requiresGuest && logged_user.value) {
    return next('/search') // or redirect to dashboard
  }

  next()
})

export default router
