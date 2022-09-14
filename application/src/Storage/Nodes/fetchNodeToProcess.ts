import { NoNodeFoundError } from './NoNodeFoundError'
import findNotProcessedNodeWithAttemptLimit from './findNotProcessedNodeWithAttemptLimit'
import findNodeWithOldestRefreshWithLimits from './findNodeWithOldestRefreshWithLimits'
import Node from '../Definitions/Node'
import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'

export const fetchNodeToProcess = async (elastic: ElasticClient): Promise<Node> => {
  await elastic.indices.refresh({ index: nodeIndex })
  let node = await findNotProcessedNodeWithAttemptLimit(elastic)
  if (node !== null) {
    return node
  }
  node = await findNodeWithOldestRefreshWithLimits(elastic)
  if (node !== null) {
    return node
  }

  throw new NoNodeFoundError()
}
