import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue'

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
      component: () => import('@/views/MainView.vue')
    },
  ]
})

export default router
