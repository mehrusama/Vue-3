import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import AdminView from '../views/AdminView.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
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
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ]
  })
  router.beforeEach((to, from, next) => {
    try {
      const isAdminAuthenticated = store.getters.isAdminAuthenticated;
      const isAuthenticated = store.getters.isAuthenticated;
  
      if (to.name === 'admin') {
        if (!isAdminAuthenticated) {
          next({ name: 'login' });
        } else {
          next();
        }
      } else if (to.name === 'home') {
        if (!isAuthenticated) {
          next({ name: 'login' });
        } else {
          next();
        }
      } else if (to.name === 'login' || to.name === 'signup') {
        if (isAuthenticated) {
          next({ name: 'home' });
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (error) {
      console.error('Error in navigation guard:', error);
      next(false)
    }
  })
export default router
