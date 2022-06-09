import type { AppRouteRaw } from '../types'

const routes: AppRouteRaw[] = [
  {
    path: '/',
    name: 'Home',
    index: 1,
    component: () => import('/@/views/home/home.vue')
  },
  {
    path: '/:catchAll(.*)',
    index: -1,
    component: () => import('/@/views/not-found/index.vue')
  }
]

export default routes
