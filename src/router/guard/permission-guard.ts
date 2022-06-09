import type { Router } from 'vue-router'

/**
 * 路由守卫 - 监听授权页面的授权
 * @param router 路由对象
 */
export const createPermissionGuard = (router: Router): void => {
  router.beforeEach((to, from, next) => {
    next()
  })
}
