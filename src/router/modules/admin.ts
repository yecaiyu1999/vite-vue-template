import type { AppRouteRaw } from '../types'

const routes: AppRouteRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    index: 1,
    component: () => import('/@/views/admin/admin.vue'),
    children: []
  }
]

export default routes
