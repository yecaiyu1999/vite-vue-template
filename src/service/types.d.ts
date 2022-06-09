/**
 * service层的所有的接口的定义
 */
export interface Result<T = any> {
  code: number
  msg?: string
  data: T
}
