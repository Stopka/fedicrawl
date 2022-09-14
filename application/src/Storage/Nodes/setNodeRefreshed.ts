import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import Node from '../Definitions/Node'
import getNode from './getNode'

export const setNodeRefreshed = async (elastic: ElasticClient, node:Node):Promise<Node> => {
  const date = new Date()
  console.info('Setting node refreshed', { domain: node.domain, date: date })
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      refreshedAt: date.getTime()
    }
  })
  return getNode(elastic, node.domain)
}
