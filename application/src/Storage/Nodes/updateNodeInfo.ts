import { NodeInfo } from '../../Fediverse/NodeInfo/retrieveNodeInfo'
import Node from '../Definitions/Node'
import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import getNode from './getNode'
import assertDefined from '../assertDefined'

const assertPositiveInt = (number: number | undefined): number | undefined => {
  if (number === undefined) {
    return undefined
  }
  return Math.max(0, Math.round(number))
}

export const updateNodeInfo = async (
  elastic: ElasticClient,
  node: Node,
  nodeInfo: NodeInfo
): Promise<Node> => {
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      name: nodeInfo?.name,
      openRegistrations: nodeInfo?.openRegistrations,
      softwareName: nodeInfo?.software?.name?.toLocaleLowerCase() ?? null,
      softwareVersion: nodeInfo?.software?.version ?? null,
      halfYearActiveUserCount: assertPositiveInt(
        nodeInfo?.usage?.users?.activeHalfyear
      ),
      monthActiveUserCount: assertPositiveInt(
        nodeInfo?.usage?.users?.activeMonth
      ),
      statusesCount: assertPositiveInt(nodeInfo?.usage?.localPosts),
      totalUserCount: assertPositiveInt(nodeInfo?.usage?.users?.total)
    }
  })

  const resultNode = assertDefined(
    await getNode(elastic, node.domain),
    'Missing node after updating it'
  )
  console.info('Updated node info', { resultNode })
  return resultNode
}
