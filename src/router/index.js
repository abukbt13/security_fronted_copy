import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/auth/Login.vue'
import Validate from '@/views/auth/Validate.vue'
import Reset_Password from '@/views/auth/Reset_Password.vue'
import Verify from '@/views/auth/Verify.vue'
import Forget_Password from '@/views/auth/Forget_Password.vue'
import Admin_Dashboard from '@/views/dashboard/admin/Index.vue'
import Super_admin_Dashboard from "@/views/dashboard/super_admin/Index.vue";
import Case_details from '@/views/dashboard/admin/Case_details.vue'
import Show_admin from '@/views/dashboard/super_admin/Show_admin.vue'
import View_evidence from "@/views/dashboard/admin/View_evidence.vue";
import About from "@/views/About.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component : Login
    },
    {
      path: '/about_us',
      component : About
    },
    {
      path: '/validate/:id',
      component : Validate
    },
    {
      path: '/reset_password/:email/:otp',
      component : Reset_Password
    },
    {
      path: '/forget_password',
      component :Forget_Password
    },
    {
      path: '/verify/:id',
      component : Verify
    },
    {
      path: '/validate/:id',
      component : Validate
    },
    {
      path: '/dashboard/admin',
      component : Admin_Dashboard
    },
    {
      path: '/dashboard/super_admin',
      component : Super_admin_Dashboard
    },
    {
      path: '/dashboard/admin/case_details/:key_id',
      component : Case_details
    },
    {
      path: '/dashboard/super_admin/show_admin',
      component : Show_admin
    },
    {
      path: '/dashboard/admin/view_evidence/:case_id/:secret_key',
      component: View_evidence
    }
  ]
})

export default router
