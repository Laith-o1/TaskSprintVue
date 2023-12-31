import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'linkActiveClass',
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginViewVue
    },
    {
      path: '/Task',
      name: 'MainView',
      component: () => import('@/views/MainView.vue'),
      // create middleware for this route only user can access this route is authenticated
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.token) {
          next()
        } else {
          next({ name: 'LoginView' })
        }
      }
    },
  ]
})

export default router
