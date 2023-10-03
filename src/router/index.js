import { createRouter, createWebHistory,RouterView } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/course',
      name: 'course',
      component: RouterView,
      children: [
        {
          path: 'approved',
          name: 'course_approved',
          component: () => import('../components/course/CourseApproved.vue'),
        },
        {
          path: 'pending',
          name: 'course_pending',
          component: () => import('../components/course/CoursePending.vue'),
        },
        {
          path: 'rejected',
          name: 'course_rejected',
          component: () => import('../components/course/CourseRejected.vue'),
        },
      ]
    },
    {
      path: '/topic',
      name: 'topic',
      component: () => import('../views/Course.vue'),
    },
    {
      path: '/lesson',
      name: 'lesson',
      component: () => import('../views/Course.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue'),
      // component: RouterView,
      children: [
        {
          path: 'user',
          name: 'account_user',
          component: () => import('../components/account/AccountClient.vue'),
        },
        {
          path: 'admin',
          name: 'account_admin',
          component: () => import('../components/account/AccountCms.vue'),
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue'),
    },
  ]
})



export default router
