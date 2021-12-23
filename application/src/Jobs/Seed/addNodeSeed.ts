import { PrismaClient } from '@prisma/client'
import { createMissingNodes } from '../../Storage/Nodes/createMissingNodes'

export const addNodeSeed = async (prisma:PrismaClient, domain:string):Promise<boolean> => {
  console.info('Trying to add seed domain node', { domain: domain })
  const result = await createMissingNodes(prisma, [domain])
  return result > 0
}
