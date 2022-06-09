import type { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from './utils/_util'

/**
 * 模拟后台接口
 */
export default [
  // user menu
  {
    url: '/api/test',
    timeout: 1000,
    method: 'get',
    response: () => {
      // 统一返回测试数据
      return createTestData()
    }
  }
  // todo ...
] as MockMethod[]

function createTestData() {
  return [
    {
      id: 1,
      name: '张三',
      age: 20,
      sex: '男'
    },
    {
      id: 2,
      name: '李四',
      age: 22,
      sex: '男'
    },
    {
      id: 3,
      name: '王露',
      age: 20,
      sex: '女'
    },
    {
      id: 4,
      name: '朱琪',
      age: 18,
      sex: '女'
    },
    {
      id: 5,
      name: '魏启芳',
      age: 24,
      sex: '女'
    }
  ]
}
