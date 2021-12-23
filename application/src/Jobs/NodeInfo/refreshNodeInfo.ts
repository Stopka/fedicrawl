import { Node, PrismaClient } from '@prisma/client'
import { retrieveDomainNodeInfo } from '../../Fediverse/NodeInfo/retrieveDomainNodeInfo'
import { updateNode } from '../../Storage/Nodes/updateNode'

export const refreshNodeInfo = async (prisma: PrismaClient, node:Node):Promise<Node> => {
  console.info('Updating info of node', { nodeDomain: node.domain })
  try {
    const nodeInfo = await retrieveDomainNodeInfo(node.domain)
    return await updateNode(prisma, node, nodeInfo)
  } catch (error) {
    console.warn('Failed to update node info: ' + error)
    return node
  }
}
