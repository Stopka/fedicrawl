import { PrismaClient, Node } from '@prisma/client'
export const createMissingNodes = async (client:PrismaClient, domains:string[]):Promise<number> => {
  const result = await client.node.createMany(
    {
      data: domains.map(domain => {
        return {
          domain: domain
        }
      }),
      skipDuplicates: true
    }
  )
  console.info('Created new nodes', { count: result.count })
  return result.count
}
