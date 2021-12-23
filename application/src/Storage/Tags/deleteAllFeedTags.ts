import { PrismaClient, Feed } from '@prisma/client'

export const deleteAllFeedTags = async (prisma:PrismaClient, feed:Feed):Promise<number> => {
  const result = await prisma.feedToTag.deleteMany({
    where: {
      feedId: feed.id
    }
  })
  console.log('Removed all tags from feed', { count: result.count, feedName: feed.name, nodeId: feed.nodeId })
  return result.count
}
