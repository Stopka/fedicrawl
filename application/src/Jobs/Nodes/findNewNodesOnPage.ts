import { PrismaClient, Node } from '@prisma/client'
import { createMissingNodes } from '../../Storage/Nodes/createMissingNodes'
import { NodeProvider } from '../../Fediverse/Providers/NodeProvider'

export const findNewNodesOnPage = async (
  prisma:PrismaClient, provider: NodeProvider, node:Node, page:number
):Promise<number> => {
  const domains = await provider.retrieveNodes(node.domain, page)
  console.log('Found nodes', { count: domains.length, domain: node.domain, provider: provider.getKey(), page: page })
  return await createMissingNodes(prisma, domains)
}
