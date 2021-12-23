import { PrismaClient, Tag } from '@prisma/client'
import { fetchTags } from '../../Storage/Tags/fetchTags'
import { createMissingTags } from '../../Storage/Tags/createMissingTags'

export const fetchOrCreateTags = async (prisma:PrismaClient, tagNames:string[]):Promise<Tag[]> => {
  console.log('Searching for tags', { count: tagNames.length })
  await createMissingTags(prisma, tagNames)
  return await fetchTags(prisma, tagNames)
}
