import RobotsTxt from '../RobotsTxt/RobotsTxt.js'
import { retrieveWellKnown } from './retrieveWellKnown'
import { retrieveNodeInfo, NodeInfo } from './retrieveNodeInfo'
import { NoSupportedLinkError } from './NoSupportedLinkError'

export const retrieveDomainNodeInfo = async (
  domain: string,
  robotsTxt: RobotsTxt
): Promise<NodeInfo> => {
  const wellKnown = await retrieveWellKnown(domain, robotsTxt)
  const link = wellKnown.links.find(
    (link) => link.rel === 'http://nodeinfo.diaspora.software/ns/schema/2.0'
  )
  if (typeof link === 'undefined') {
    throw new NoSupportedLinkError(domain)
  }
  return await retrieveNodeInfo(link.href, robotsTxt)
}
