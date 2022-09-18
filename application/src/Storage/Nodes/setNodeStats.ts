import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import Node from '../Definitions/Node'
import getNode from './getNode'
import { NodeStats } from '../../Jobs/Nodes/updateNodeFeedStats'
import assertDefined from '../assertDefined'

export const setNodeStats = async (
  elastic: ElasticClient,
  node: Node,
  stats: NodeStats
): Promise<Node> => {
  console.info('Setting node stats', { domain: node.domain, stats })
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      accountFeedCount: stats.account,
      channelFeedCount: stats.channel
    }
  })
  return assertDefined(
    await getNode(elastic, node.domain),
    'Missing node after updating it'
  )
}
