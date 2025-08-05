import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/noise-generator',
      name: 'noise-generator',
      component: () => import('@/views/NoiseGeneratorView.vue'),
    },
    {
      path: '/stereo-tester',
      name: 'stereo-tester',
      component: () => import('@/views/StereoTesterView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
