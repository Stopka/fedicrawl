import { ElasticClient } from '../ElasticClient'
import Node from '../Definitions/Node'
import feedIndex from '../Definitions/feedIndex'

export const deleteOldFeeds = async (
  elastic: ElasticClient,
  node: Node
): Promise<number> => {
  await elastic.indices.refresh({ index: feedIndex })
  // delete by domain and (refreshedAt < node.refreshAttepmtedAt or refreshedAt=null)
  const result = await elastic.deleteByQuery({
    index: feedIndex,
    query: {
      bool: {
        must: [
          { match: { domain: node.domain } },
          {
            bool: {
              should: [
                { range: { refreshedAt: { lt: node.refreshAttemptedAt } } },
                {
                  bool: {
                    must_not: { exists: { field: 'refreshedAt' } }
                  }
                }
              ],
              minimum_should_match: 1
            }
          }
        ]
      }
    }
  })
  console.info('Deleted old feeds', {
    count: result.deleted ?? 0,
    olderThen: node.refreshAttemptedAt,
    nodeDomain: node.domain
  })
  return result.deleted ?? 0
}
