import { NodeInfo } from '../../Fediverse/NodeInfo/retrieveNodeInfo'
import Node from '../Definitions/Node'
import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import getNode from './getNode'

const assertPositiveInt = (number:number|undefined):number|undefined => {
  if (number === undefined) {
    return undefined
  }
  return Math.max(0, Math.round(number))
}

export const updateNodeInfo = async (elastic: ElasticClient, node: Node, nodeInfo:NodeInfo):Promise<Node> => {
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      name: nodeInfo?.name,
      openRegistrations: nodeInfo?.openRegistrations,
      softwareName: nodeInfo?.software?.name?.toLocaleLowerCase(),
      softwareVersion: nodeInfo?.software?.version,
      halfYearActiveUserCount: assertPositiveInt(nodeInfo?.usage?.users?.activeHalfyear),
      monthActiveUserCount: assertPositiveInt(nodeInfo?.usage?.users.activeMonth),
      statusesCount: assertPositiveInt(nodeInfo?.usage?.localPosts),
      totalUserCount: assertPositiveInt(nodeInfo?.usage?.users?.total)
    }
  })

  const resultNode = await getNode(elastic, node.domain)
  console.info('Updated node info', { node })
  return resultNode
}
