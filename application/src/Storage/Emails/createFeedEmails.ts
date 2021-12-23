import { PrismaClient, Feed } from '@prisma/client'

export const createFeedEmails = async (prisma:PrismaClient, feed:Feed, emails:string[]):Promise<number> => {
  const result = await prisma.email.createMany({
    data: emails.map(email => {
      return {
        feedId: feed.id,
        address: email
      }
    }),
    skipDuplicates: true
  })
  console.log('Added emails to feed', { count: result.count, feedName: feed.name, nodeId: feed.nodeId })
  return result.count
}
