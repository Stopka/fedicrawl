import RobotsTxt from '../RobotsTxt/RobotsTxt.js'

export type NodeProviderMethod = (
  domain: string,
  page: number,
  robotsTxt: RobotsTxt
) => Promise<string[]>
