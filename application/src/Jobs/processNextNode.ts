import fetchRobotsTxt from '../Fediverse/RobotsTxt/fetchRobotsTxt.js'
import { fetchNodeToProcess } from '../Storage/Nodes/fetchNodeToProcess'
import { ProviderRegistry } from '../Fediverse/Providers/ProviderRegistry'
import isDomainValid from '../Storage/Nodes/isDomainValid.js'
import { setNodeRefreshed } from '../Storage/Nodes/setNodeRefreshed'
import batchPromises from '../Utils/batchPromises.js'
import { refreshNodeInfo } from './NodeInfo/refreshNodeInfo'
import { setNodeRefreshAttempted } from '../Storage/Nodes/setNodeRefreshAttempted'
import { findNewNodes } from './Nodes/findNewNodes'
import { NodeProvider } from '../Fediverse/Providers/NodeProvider'
import { FeedProvider } from '../Fediverse/Providers/FeedProvider'
import { refreshFeeds } from './Feeds/refreshFeeds'
import { deleteOldFeeds } from '../Storage/Feeds/deleteOldFeeds'
import refreshNodeIps from './Dns/refreshNodeIps'
import { ElasticClient } from '../Storage/ElasticClient'
import updateNodeFeedStats from './Nodes/updateNodeFeedStats'
import deleteDomains from './Seed/deleteBannedNodes.js'

export const processNextNode = async (
  elastic: ElasticClient,
  providerRegistry: ProviderRegistry
): Promise<void> => {
  console.info('#############################################')
  let node = await fetchNodeToProcess(elastic)
  node = await setNodeRefreshAttempted(elastic, node)
  // TODO remove check later
  if (!isDomainValid(node.domain)) {
    console.info('Node domain is invalid, deleting node', { domain: node.domain })
    await deleteDomains(elastic, [node.domain])
    return
  }
  node = await refreshNodeIps(elastic, node)
  const robotsTxt = await fetchRobotsTxt(node.domain)
  node = await refreshNodeInfo(elastic, node, robotsTxt)

  const softwareName = node.softwareName ?? ''
  if (!providerRegistry.containsKey(softwareName)) {
    console.warn('Unknown software', {
      domain: node.domain,
      software: node.softwareName
    })
    await deleteOldFeeds(elastic, node)
    await setNodeRefreshed(elastic, node)
    return
  }
  const provider = providerRegistry.getProviderByKey(softwareName)

  await batchPromises(
    provider.getNodeProviders().map((nodeProvider: NodeProvider) => {
      return async () => {
        console.info('Searching for nodes', {
          domain: node.domain,
          provider: nodeProvider.getKey()
        })
        return await findNewNodes(elastic, nodeProvider, node, robotsTxt)
      }
    }),
    Number(process.env.NODE_PROVIDER_BATCH_SIZE ?? 5)
  )

  await batchPromises(
    provider.getFeedProviders().map((feedProvider: FeedProvider) => {
      return async () => {
        console.info('Searching for feeds', {
          domain: node.domain,
          provider: feedProvider.getKey()
        })
        return await refreshFeeds(elastic, feedProvider, node, robotsTxt)
      }
    }),
    Number(process.env.FEED_PROVIDER_BATCH_SIZE ?? 5)
  )

  await deleteOldFeeds(elastic, node)
  await updateNodeFeedStats(elastic, node)

  await setNodeRefreshed(elastic, node)
}
