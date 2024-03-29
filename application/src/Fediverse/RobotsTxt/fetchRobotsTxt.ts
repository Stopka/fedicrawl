import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import robotsParser from 'robots-parser'
import getTimeoutMilliseconds from '../getTimeoutMilliseconds.js'
import RobotsTxt from './RobotsTxt.js'
import { RobotsTxtError } from './RobotsTxtError.js'

const userAgent = 'FediCrawl/1.0'

export default async function fetchRobotsTxt (domain: string): Promise<RobotsTxt> {
  console.info('Fetching robots.txt', { domain })
  const url = new URL(`https://${domain}/robots.txt`)
  let content = ''
  try {
    const robotsTxt = await axios.get(url.toString(), {
      headers: { 'User-Agent': userAgent },
      timeout: getTimeoutMilliseconds(domain)
    })
    content = String(robotsTxt.data)
  } catch (error) {
    console.info('Robots.txt not found', { error, url })
  }
  const robots = robotsParser(url.toString(), content)
  const isAllowed = (url: URL): boolean => robots.isAllowed(url.toString(), userAgent) ?? true
  return {
    isAllowed,
    getIfAllowed: async <T = any, R = AxiosResponse<T>, D = any>(url: URL, config?: AxiosRequestConfig<D>): Promise<R> => {
      if (!isAllowed(url)) {
        throw new RobotsTxtError(url)
      }
      return await axios.get(url.toString(), {
        headers: { 'User-Agent': userAgent },
        ...config
      })
    },
    postIfAllowed: async <T = any, R = AxiosResponse<T>, D = any>(url: URL, data?: D, config?: AxiosRequestConfig<D>): Promise<R> => {
      if (!isAllowed(url)) {
        throw new RobotsTxtError(url)
      }
      return await axios.post(url.toString(), data, {
        headers: { 'User-Agent': userAgent },
        ...config
      })
    }
  }
}
