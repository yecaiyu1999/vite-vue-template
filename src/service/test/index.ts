import httpRequest from '../index'

export enum TestAPI {
  test = '/test'
}
// 登录模块所有的 api

/**
 * 测试接口
 */
export function test() {
  return httpRequest.get<any>({
    url: TestAPI.test
  })
}
