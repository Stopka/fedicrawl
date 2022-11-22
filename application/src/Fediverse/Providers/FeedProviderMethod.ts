import RobotsTxt from '../RobotsTxt/RobotsTxt.js'
import { FeedData } from './FeedData'

export type FeedProviderMethod = (
  domain: string,
  page: number,
  robotsTxt: RobotsTxt
) => Promise<FeedData[]>
