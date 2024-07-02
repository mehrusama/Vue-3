import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import store from '@/store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'dashboard' && !store.getters.isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'signup') && store.getters.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
