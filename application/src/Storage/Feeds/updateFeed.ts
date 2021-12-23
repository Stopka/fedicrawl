import { Feed, PrismaClient } from '@prisma/client'
import StorageFeedData from './StorageFeedData'

export const updateFeed = async (prisma:PrismaClient, feed:Feed, feedData:StorageFeedData):Promise<Feed> => {
  const updatedFeed = await prisma.feed.update({
    data: {
      url: feedData.url,
      bot: feedData.bot,
      avatar: feedData.avatar,
      followersCount: feedData.followersCount,
      followingCount: feedData.followingCount,
      statusesCount: feedData.statusesCount,
      lastStatusAt: feedData.lastStatusAt,
      description: feedData.description,
      displayName: feedData.displayName,
      locked: feedData.locked,
      createdAt: feedData.createdAt,
      refreshedAt: new Date(),
      fulltext: feedData.fulltext
    },
    where: {
      id: feed.id
    }
  })
  console.info('Updated feed', { feedName: feed.name, nodeId: feed.nodeId })
  return updatedFeed
}
