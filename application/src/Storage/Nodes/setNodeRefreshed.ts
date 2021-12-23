import { Node, PrismaClient } from '@prisma/client'

export const setNodeRefreshed = async (prisma:PrismaClient, node:Node):Promise<Node> => {
  const date = new Date()
  console.info('Setting node refreshed', { domain: node.domain, date: date })
  return await prisma.node.update({
    data: {
      refreshedAt: date
    },
    where: {
      id: node.id
    }
  })
}
