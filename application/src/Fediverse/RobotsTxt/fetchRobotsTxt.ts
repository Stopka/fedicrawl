import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import robotsParser from 'robots-parser'
import { getDefaultTimeoutMilliseconds } from '../getDefaultTimeoutMilliseconds.js'
import RobotsTxt from './RobotsTxt.js'
import { RobotsTxtError } from './RobotsTxtError.js'

const userAgent = 'FediCrawl/1.0'

export default async function fetchRobotsTxt (domain: string): Promise<RobotsTxt> {
  console.info('Fetching robots.txt', { domain })
  const url = `https://${domain}/robots.txt`
  let content = ''
  try {
    const robotsTxt = await axios.get(url, {
      headers: { 'User-Agent': userAgent },
      timeout: getDefaultTimeoutMilliseconds()
    })
    content = String(robotsTxt.data)
  } catch (error) {
    console.info('Robots.txt not found', { error, url })
  }
  const robots = robotsParser(url, content)
  const isAllowed = (url: string): boolean => robots.isAllowed(url, userAgent) ?? true
  return {
    isAllowed,
    getIfAllowed: async <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> => {
      if (!isAllowed(url)) {
        throw new RobotsTxtError(url)
      }
      return await axios.get(url, {
        headers: { 'User-Agent': userAgent },
        ...config
      })
    },
    postIfAllowed: async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> => {
      if (!isAllowed(url)) {
        throw new RobotsTxtError(url)
      }
      return await axios.post(url, data, {
        headers: { 'User-Agent': userAgent },
        ...config
      })
    }
  }
}
