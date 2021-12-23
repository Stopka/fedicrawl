import { Node, PrismaClient, Feed } from '@prisma/client'
import StorageFeedData from './StorageFeedData'

export const createFeed = async (prisma: PrismaClient, feedData: StorageFeedData, node: Node): Promise<Feed> => {
  const feed = await prisma.feed.create({
    data: {
      url: feedData.url,
      name: feedData.name,
      bot: feedData.bot,
      avatar: feedData.avatar,
      followersCount: feedData.followersCount,
      followingCount: feedData.followingCount,
      statusesCount: feedData.statusesCount,
      lastStatusAt: feedData.lastStatusAt,
      description: feedData.description,
      displayName: feedData.displayName,
      locked: feedData.locked,
      nodeId: node.id,
      createdAt: feedData.createdAt,
      fulltext: feedData.fulltext
    }
  })
  console.info('Created new feed', { feedName: feed.name, nodeDomain: node.domain })
  return feed
}
