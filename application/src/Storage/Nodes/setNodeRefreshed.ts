import getCrawlingVersion from '../../Fediverse/getCrawlingVersion.js'
import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import Node from '../Definitions/Node'
import getNode from './getNode'
import assertDefined from '../assertDefined'

export const setNodeRefreshed = async (
  elastic: ElasticClient,
  node: Node
): Promise<Node> => {
  const date = new Date()
  console.info('Setting node refreshed', { domain: node.domain, date })
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      refreshedAt: date.getTime(),
      crawlingVersion: getCrawlingVersion()
    }
  })
  return assertDefined(
    await getNode(elastic, node.domain),
    'Missing node after updating it'
  )
}
