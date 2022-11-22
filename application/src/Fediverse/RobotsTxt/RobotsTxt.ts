import { AxiosRequestConfig, AxiosResponse } from 'axios'

export default interface RobotsTxt {
  isAllowed: (url: string) => boolean
  getIfAllowed: <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) => Promise<R>
  postIfAllowed: <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<R>
}
