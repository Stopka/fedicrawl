import { Node, PrismaClient } from '@prisma/client'

export const fetchNodeToProcess = async (prisma: PrismaClient): Promise<Node> => {
  const currentTimestamp = Date.now()
  const attemptLimitMilliseconds = parseInt(process.env.REATTEMPT_MINUTES ?? '60') * 60 * 1000
  const attemptLimitDate = new Date(currentTimestamp - attemptLimitMilliseconds)
  console.log('Searching for not yet processed node not attempted before attemptLimit', { attemptLimitDate, attemptLimitMilliseconds })
  const newNode = await prisma.node.findFirst({
    orderBy: {
      foundAt: 'asc'
    },
    where: {
      refreshedAt: null,
      OR: [
        {
          refreshAttemptedAt: {
            lt: attemptLimitDate
          }
        },
        {
          refreshAttemptedAt: null
        }
      ]

    }
  })
  if (newNode) {
    console.log('Found not yet processed node', { domain: newNode.domain })
    return newNode
  }
  const refreshLimitMilliseconds = parseInt(process.env.REFRESH_HOURS ?? '168') * 60 * 60 * 1000
  const refreshLimitDate = new Date(currentTimestamp - refreshLimitMilliseconds)
  console.log('Searching instance not refreshed for longest time and before refreshLimit and attemptLimit', {
    refreshLimitMilliseconds,
    refreshLimitDate,
    attemptLimitDate,
    attemptLimitMilliseconds
  })
  const node = await prisma.node.findFirst({
    orderBy: {
      refreshedAt: 'asc'
    },
    where: {
      refreshedAt: {
        lt: refreshLimitDate
      },
      OR: [
        {
          refreshAttemptedAt: {
            lt: attemptLimitDate
          }
        },
        {
          refreshAttemptedAt: null
        }
      ]
    }
  })
  if (node) {
    console.log('Found oldest node', { domain: node.domain })
  } else {
    throw new Error('No node found')
  }
  return node
}
