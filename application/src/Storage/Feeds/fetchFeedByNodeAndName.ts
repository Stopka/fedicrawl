import { Node, PrismaClient, Feed } from '@prisma/client'

export const fetchFeedByNodeAndName = async (prisma:PrismaClient, node:Node, name:string):Promise<Feed> => {
  return await prisma.feed.findFirst({
    where: {
      node: node,
      name: name
    }
  })
}
