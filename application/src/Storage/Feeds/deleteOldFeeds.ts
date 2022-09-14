import { ElasticClient } from '../ElasticClient'
import Node from '../Definitions/Node'
import feedIndex from '../Definitions/feedIndex'

export const deleteOldFeeds = async (elastic: ElasticClient, node: Node): Promise<number> => {
  await elastic.indices.refresh({ index: feedIndex })
  const result = await elastic.deleteByQuery({
    index: feedIndex,
    query: {
      bool: {
        must: [
          { match: { domain: node.domain } },
          { range: { refreshedAt: { lt: node.refreshAttemptedAt } } }
        ]
      }
    }
  })
  console.info('Deleted old feeds', {
    count: result.deleted, olderThen: node.refreshAttemptedAt, nodeDomain: node.domain
  })
  return result.deleted
}
