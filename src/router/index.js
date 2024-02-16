import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/auth/Login.vue'
import Verify from '@/views/auth/Verify.vue'
import Register from '@/views/auth/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/login',
      component : Login
    },
    {
      path: '/register',
      component : Register
    },
    {
      path: '/verify/:id',
      component : Verify
    },
  ]
})

export default router
