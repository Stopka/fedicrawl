import { PrismaClient, Tag } from '@prisma/client'

export const fetchTags = async (prisma:PrismaClient, tagNames:string[]):Promise<Tag[]> => {
  return await prisma.tag.findMany({
    where: {
      name: {
        in: tagNames
      }
    }
  })
}
