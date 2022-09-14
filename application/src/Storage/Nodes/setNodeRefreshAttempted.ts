import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import Node from '../Definitions/Node'
import getNode from './getNode'

export const setNodeRefreshAttempted = async (elastic: ElasticClient, node:Node):Promise<Node> => {
  const date = new Date()
  console.info('Setting node refresh attempt', { domain: node.domain, date: date })
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      refreshAttemptedAt: date.getTime()
    }
  })
  return getNode(elastic, node.domain)
}
