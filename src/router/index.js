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
          path: '/category',
          name: 'category',
          component: () => import('../views/Category.vue'),
          meta: {
            breadcrumb: 'Category',
          },
        },
        {
          path: '/category/add',
          name: 'category_add',
          component: () => import('../views/CategoryAdd.vue'),
          meta: {
            breadcrumb: 'Category Add',
          },
        },
        {
          path: '/category/:id',
          name: 'category_detail',
          component: () => import('../views/CategoryDetail.vue'),
          meta: {
            breadcrumb: 'Category Detail',
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
          path: '/course/add',
          name: 'course_add',
          component: () => import('../views/CourseAdd.vue'),
          meta: {
            breadcrumb: 'Course Add',
          },
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('../views/Account.vue'),
          meta: {
            breadcrumb: 'Account',
          },
          children: [
            {
              path: 'client',
              name: 'account_client',
              component: () => import('../components/account/AccountClient.vue'),
              meta: {
                breadcrumb: 'Client',
              },
            },
            {
              path: 'cms',
              name: 'account_cms',
              component: () => import('../components/account/AccountCms.vue'),
              meta: {
                breadcrumb: 'Cms',
              },
            },
          ]
        },
        {
          path: '/account/add',
          name: 'account_add',
          component: () => import('../views/AccountAdd.vue'),
          meta: {
            breadcrumb: 'Account Add',
          },
        },
        {
          path: '/account/:id',
          name: 'account_detail',
          component: () => import('../views/AccountDetail.vue'),
          meta: {
            breadcrumb: 'Account Detail',
          },
        },
        {
          path: '/topic',
          name: 'topic',
          component: () => import('../views/Topic.vue'),
          meta: {
            breadcrumb: 'Topic',
          },
        },
        {
          path: '/topic/:id',
          name: 'topic_detail',
          component: () => import('../views/TopicDetail.vue'),
          props: { isEdit: false},
          meta: {
            breadcrumb: 'Topic Detail',
          },
        },
        {
          path: '/topic/add',
          name: 'topic_add',
          component: () => import('../views/TopicAdd.vue'),
          meta: {
            breadcrumb: 'Topic Add',
          },
        },
        {
          path: '/lesson',
          name: 'lesson',
          component: () => import('../views/Lesson.vue'),
          meta: {
            breadcrumb: 'Lesson',
          },
        },
        {
          path: '/lesson/:id',
          name: 'lesson_detail',
          component: () => import('../views/LessonDetail.vue'),
          props: { isEdit: false},
          meta: {
            breadcrumb: 'Lesson Detail',
          },
        },
        {
          path: '/lesson/add',
          name: 'lesson_add',
          component: () => import('../views/LessonAdd.vue'),
          meta: {
            breadcrumb: 'Lesson Add',
          },
        },
      ]
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
