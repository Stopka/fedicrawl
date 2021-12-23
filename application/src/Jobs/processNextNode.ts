import { PrismaClient } from '@prisma/client'
import { fetchNodeToProcess } from '../Storage/Nodes/fetchNodeToProcess'
import { ProviderRegistry } from '../Fediverse/Providers/ProviderRegistry'
import { setNodeRefreshed } from '../Storage/Nodes/setNodeRefreshed'
import { refreshNodeInfo } from './NodeInfo/refreshNodeInfo'
import { setNodeRefreshAttempted } from '../Storage/Nodes/setNodeRefreshAttempted'
import { findNewNodes } from './Nodes/findNewNodes'
import { NodeProvider } from '../Fediverse/Providers/NodeProvider'
import { FeedProvider } from '../Fediverse/Providers/FeedProvider'
import { refreshFeeds } from './Feeds/refreshFeeds'

export const processNextNode = async (prisma:PrismaClient, providerRegistry:ProviderRegistry):Promise<void> => {
  console.info('#############################################')
  let node = await fetchNodeToProcess(prisma)
  node = await setNodeRefreshAttempted(prisma, node)

  node = await refreshNodeInfo(prisma, node)

  if (!providerRegistry.containsKey(node.softwareName)) {
    console.warn('Unknown software', { domain: node.domain, software: node.softwareName })
    await setNodeRefreshed(prisma, node)
    return
  }
  const provider = providerRegistry.getProviderByKey(node.softwareName)

  await Promise.all(
    provider.getNodeProviders().map((nodeProvider:NodeProvider) => {
      console.info('Searching for nodes', { domain: node.domain, provider: nodeProvider.getKey() })
      return findNewNodes(prisma, nodeProvider, node)
    })
  )

  await Promise.all(
    provider.getFeedProviders().map((feedProvider:FeedProvider) => {
      console.info('Searching for feeds', { domain: node.domain, provider: feedProvider.getKey() })
      return refreshFeeds(prisma, feedProvider, node)
    })
  )

  await setNodeRefreshed(prisma, node)
}
