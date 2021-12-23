import { retrieveWellKnown } from './retrieveWellKnown'
import { retrieveNodeInfo, NodeInfo } from './retrieveNodeInfo'

export const retrieveDomainNodeInfo = async (domain:string):Promise<NodeInfo> => {
  const wellKnown = await retrieveWellKnown(domain)
  const link = wellKnown.links.find(link => link.rel === 'http://nodeinfo.diaspora.software/ns/schema/2.0')
  if (typeof link === 'undefined') {
    throw new Error(`No supported link node info link for ${domain}`)
  }
  return await retrieveNodeInfo(link.href)
}
