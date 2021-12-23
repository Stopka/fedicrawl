import { PrismaClient, Feed } from '@prisma/client'
import { FieldData } from '../../Fediverse/Providers/FieldData'

export const createFeedFields = async (prisma:PrismaClient, feed:Feed, fieldData:FieldData[]):Promise<number> => {
  const result = await prisma.field.createMany({
    data: fieldData.map(item => {
      return {
        feedId: feed.id,
        name: item.name,
        value: item.value
      }
    }),
    skipDuplicates: true
  })
  console.log('Added fields to feed', { count: result.count, feedName: feed.name, nodeId: feed.nodeId })
  return result.count
}
