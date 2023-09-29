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
          name: 'course',
          component: () => import('../components/course/CourseApproved.vue'),
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
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})



export default router
