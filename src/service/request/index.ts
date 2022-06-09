import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HttpRequestConfig, HttpRequestInterceptors } from './types'

import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

import localCache from '/@/utils/cache'

const DEFAULT_LOADING = true

class HttpRequest {
  instance: AxiosInstance
  interceptors?: HttpRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 设置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 设置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 判断是否携带token
        const token = localCache.getCache('token')
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        }

        // 加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载...',
            background: 'rgba(122, 122, 122, 0.8)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 移除加载动画
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 移除加载动画
        this.loading?.close()

        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T>(config: HttpRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置为true,这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置为true,这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: HttpRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HttpRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HttpRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HttpRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HttpRequest
