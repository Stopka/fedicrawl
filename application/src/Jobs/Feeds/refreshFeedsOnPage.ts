import { Node, PrismaClient, Feed } from '@prisma/client'
import { refreshOrAddFeed } from './refreshOrAddFeed'
import { FeedProvider } from '../../Fediverse/Providers/FeedProvider'

export const refreshFeedsOnPage = async (prisma: PrismaClient, provider:FeedProvider, node:Node, page:number):Promise<Feed[]> => {
  const feedData = await provider.retrieveFeeds(node.domain, page)
  console.info('Retrieved feeds', { count: feedData.length, domain: node.domain, provider: provider.getKey(), page: page })
  return Promise.all(feedData.map(
    feedDataItem => refreshOrAddFeed(prisma, node, feedDataItem)
  ))
}
