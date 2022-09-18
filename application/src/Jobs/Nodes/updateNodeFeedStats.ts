import countNodeFeeds from '../../Storage/Feeds/countNodeFeeds'
import { setNodeStats } from '../../Storage/Nodes/setNodeStats'
import { ElasticClient } from '../../Storage/ElasticClient'
import Node from '../../Storage/Definitions/Node'

export interface NodeStats {
  account: number
  channel: number
}

export default async function updateNodeFeedStats (
  elasticClient: ElasticClient,
  node: Node
): Promise<void> {
  await setNodeStats(
    elasticClient,
    node,
    await countNodeFeeds(elasticClient, node.domain)
  )
}
