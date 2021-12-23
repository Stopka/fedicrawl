import { refreshFeedsOnPage } from './refreshFeedsOnPage'
import { FeedProvider } from '../../Fediverse/Providers/FeedProvider'
import { Node, PrismaClient } from '@prisma/client'

export const refreshFeeds = async (prisma:PrismaClient, provider:FeedProvider, node:Node):Promise<void> => {
  try {
    for (let page = 0; true; page++) {
      console.info('Retrieve feeds page', { nodeDomain: node.domain, provider: provider.getKey(), page: page })
      await refreshFeedsOnPage(prisma, provider, node, page)
    }
  } catch (e) {
    console.info('Feed search finished: ' + e, { nodeDomain: node.domain, provider: provider.getKey() })
  }
}
