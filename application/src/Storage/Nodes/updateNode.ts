import { Node, PrismaClient } from '@prisma/client'
import { NodeInfo } from '../../Fediverse/NodeInfo/retrieveNodeInfo'

export const updateNode = async (prisma: PrismaClient, node: Node, nodeInfo:NodeInfo):Promise<Node> => {
  const updated = await prisma.node.update({
    where: {
      id: node.id
    },
    data: {
      softwareName: nodeInfo.software.name,
      softwareVersion: nodeInfo.software.version,
      totalUserCount: nodeInfo.usage?.users?.total ?? null,
      monthActiveUserCount: nodeInfo.usage?.users?.activeMonth ?? null,
      halfYearActiveUserCount: nodeInfo.usage?.users?.activeHalfyear ?? null,
      statusesCount: nodeInfo.usage?.localPosts ?? null,
      openRegistrations: nodeInfo.openRegistrations ?? null
    }
  })
  console.info('Updated node info', { domain: updated.domain, software: updated.softwareName })
  return updated
}
