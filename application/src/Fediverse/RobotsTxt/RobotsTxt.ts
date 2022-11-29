import { AxiosRequestConfig, AxiosResponse } from 'axios'

export default interface RobotsTxt {
  isAllowed: (url: URL) => boolean
  getIfAllowed: <T = any, R = AxiosResponse<T>, D = any>(url: URL, config?: AxiosRequestConfig<D>) => Promise<R>
  postIfAllowed: <T = any, R = AxiosResponse<T>, D = any>(url: URL, data?: D, config?: AxiosRequestConfig<D>) => Promise<R>
}
