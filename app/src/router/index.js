import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinDeskView from '@/views/CoinDeskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/coin-desk',
      name: 'coin-desk',
      component: CoinDeskView
    },
    {
      path: '/rewards',
      name: 'rewards',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/rewards/AllRewardView.vue')
    },
    {
      path: '/rewards/:id',
      name: 'rewards.show',
      component: () => import('@/views/rewards/ShowView.vue')
    },
    {
      path: '/rewards/create',
      name: 'rewards.create',
      component: () => import('@/views/rewards/CreateView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogoutView.vue')
    },
    {
      path:'/socket',
      name:'socket-test',
      component:() => import('@/views/TestSocketView.vue')
    },
  ]
})

//export แบบ ไม่กำหนดชื่อ ถ้าจะทำ ตั้งตั้งชื่อตัวใหม่
export default router
