import { Node, PrismaClient } from '@prisma/client'

export const fetchNodeToProcess = async (prisma: PrismaClient): Promise<Node> => {
  console.log('Searching for not yet processed node')
  const newNode = await prisma.node.findFirst({
    orderBy: {
      foundAt: 'asc'
    },
    where: {
      refreshedAt: null
    }
  })
  if (newNode) {
    console.log('Found not yet processed node', { domain: newNode.domain })
    return newNode
  }
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  console.log('Searching instance not refreshed for longest time and at least a month ago', { date: date })
  const node = await prisma.node.findFirst({
    orderBy: {
      refreshedAt: 'asc'
    },
    where: {
      refreshedAt: {
        lt: date
      }
    }
  })
  if (node) {
    console.log('Found oldest node', { domain: newNode.domain })
  } else {
    throw new Error('No node found')
  }
  return node
}
