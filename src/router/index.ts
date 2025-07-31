import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/tone-generator',
    name: 'tone-generator',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/sine-sweep',
    name: 'sine-sweep',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/audio-analyzer',
    name: 'audio-analyzer',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/noise-generator',
    name: 'noise-generator',
    component: () => import('@/views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
