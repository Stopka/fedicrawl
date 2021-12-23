import { Node, PrismaClient } from '@prisma/client'

export const setNodeRefreshAttempted = async (prisma:PrismaClient, node:Node):Promise<Node> => {
  const date = new Date()
  console.info('Setting node refresh attempt', { domain: node.domain, date: date })
  return await prisma.node.update({
    data: {
      refreshAttemptedAt: date
    },
    where: {
      id: node.id
    }
  })
}
