import { Node, PrismaClient } from '@prisma/client'

export const deleteOldFeeds = async (prisma: PrismaClient, node: Node): Promise<number> => {
  const result = await prisma.feed.deleteMany({
    where: {
      nodeId: {
        equals: node.id
      },
      refreshedAt: {
        lt: node.refreshAttemptedAt
      }
    }
  })
  console.info('Deleted old feeds', {
    count: result.count, olderThen: node.refreshAttemptedAt, nodeDomain: node.domain
  })
  return result.count
}
