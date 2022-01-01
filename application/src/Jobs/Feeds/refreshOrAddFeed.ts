import { FeedData } from '../../Fediverse/Providers/FeedData'
import { fetchFeedByNodeAndName } from '../../Storage/Feeds/fetchFeedByNodeAndName'
import { refreshFeed } from './refreshFeed'
import { addFeed } from './addFeed'
import { Node, PrismaClient, Feed } from '@prisma/client'

export const refreshOrAddFeed = async (prisma:PrismaClient, node:Node, feedData:FeedData):Promise<Feed> => {
  const feed = await fetchFeedByNodeAndName(prisma, node, feedData.name)
  if (feed) {
    console.info('Refreshing feed', { nodeDomain: node.domain, feedName: feedData.name, feedType: feedData.type })
    return await refreshFeed(prisma, feed, feedData, node)
  }
  console.info('Adding feed', { nodeDomain: node.domain, feedName: feedData.name, feedType: feedData.type })
  return await addFeed(prisma, node, feedData)
}
