import { PrismaClient, Feed } from '@prisma/client'

export const deleteAllFeedEmails = async (prisma:PrismaClient, feed:Feed):Promise<number> => {
  const result = await prisma.email.deleteMany({
    where: {
      feedId: feed.id
    }
  })
  console.log('Removed all emails from feed', { count: result.count, feedName: feed.name, nodeId: feed.nodeId })
  return result.count
}
