import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HttpRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface HttpRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HttpRequestInterceptors<T>
  showLoading?: boolean
}
