import { PrismaClient } from '@prisma/client'

export const createMissingTags = async (prisma:PrismaClient, tagNames:string[]):Promise<number> => {
  const result = await prisma.tag.createMany({
    data: tagNames.map(tagName => {
      return {
        name: tagName
      }
    }
    ),
    skipDuplicates: true
  })
  console.log('Created missing tags', { count: result.count })
  return result.count
}
