import {createRouter, createWebHistory, RouterView, useRoute} from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import {useAuthStore} from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: {
            breadcrumb: 'Dashboard',
          },
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/Profile.vue'),
          meta: {
            breadcrumb: 'Profile',
          },
        },
        {
          path: '/course',
          name: 'course',
          component: () => import('../views/Course.vue'),
          meta: {
            breadcrumb: 'Course',
          },
          children: [
            {
              path: 'approved',
              name: 'course_approved',
              component: () => import('../components/course/CourseApproved.vue'),
              meta: {
                breadcrumb: 'Approve',
              },
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
            {
              path: 'add',
              name: 'course_add',
              component: () => import('../components/course/CourseAdd.vue'),
            },
          ]
        },
        {
          path: '/course/:type/:id',
          name: 'course_detail',
          component: () => import('../views/CourseDetail.vue'),
          meta: {
            breadcrumb: 'Course Detail',
          },
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('../views/Account.vue'),
          meta: {
            breadcrumb: 'Account',
          },
          // component: RouterView,
          children: [
            {
              path: 'client',
              name: 'account_user',
              component: () => import('../components/account/AccountClient.vue'),
              meta: {
                breadcrumb: 'Client',
              },
            },
            {
              path: 'cms',
              name: 'account_admin',
              component: () => import('../components/account/AccountCms.vue'),
              meta: {
                breadcrumb: 'Cms',
              },
            },
          ]
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
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      component: () => import('../views/PasswordReset.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if(!authStore.isAuthenticate){
    switch (to.name) {
      case 'login':
      case 'forgot-password':
      case 'password-reset':
        next();
        break;
      default:
        next({name: 'login'});
        break;
    }
  }
  else if (authStore.isAuthenticate && (to.name === 'login' || to.name === 'forgot-password')) next({name: 'dashboard'})
  else next()
})

export default router
