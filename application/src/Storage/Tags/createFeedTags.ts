import { PrismaClient, Tag, Feed } from '@prisma/client'

export const createFeedTags = async (prisma:PrismaClient, feed:Feed, tags:Tag[]):Promise<number> => {
  const result = await prisma.feedToTag.createMany({
    data: tags.map(tag => {
      return {
        feedId: feed.id,
        tagId: tag.id
      }
    }),
    skipDuplicates: true
  })
  console.log('Added tags to feed', { count: result.count, feedName: feed.name, nodeId: feed.nodeId })
  return result.count
}
