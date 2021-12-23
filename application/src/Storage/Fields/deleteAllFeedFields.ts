import { PrismaClient, Feed } from '@prisma/client'

export const deleteAllFeedFields = async (prisma:PrismaClient, feed:Feed):Promise<number> => {
  const result = await prisma.field.deleteMany({
    where: {
      feedId: feed.id
    }
  })
  console.log('Removed all fields from feed', { count: result.count, feedName: feed.name, nodeId: feed.nodeId })
  return result.count
}
