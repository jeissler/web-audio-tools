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
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/tone-generator',
    name: 'tone-generator',
    component: () => import('@/views/ToneGeneratorView.vue'),
  },
  {
    path: '/sine-sweep',
    name: 'sine-sweep',
    component: () => import('@/views/SineSweepView.vue'),
  },
  {
    path: '/audio-analyzer',
    name: 'audio-analyzer',
    component: () => import('@/views/AudioAnalyzerView.vue'),
  },
  {
    path: '/noise-generator',
    name: 'noise-generator',
    component: () => import('@/views/NoiseGeneratorView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
