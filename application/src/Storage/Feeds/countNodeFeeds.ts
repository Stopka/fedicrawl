import { ElasticClient } from '../ElasticClient'
import Feed from '../Definitions/Feed'
import feedIndex from '../Definitions/feedIndex'
import { NodeStats } from '../../Jobs/Nodes/updateNodeFeedStats'

interface Aggregation {
  buckets: Array<{
    key: 'account' | 'channel'
    // eslint-disable-next-line camelcase
    doc_count: number
  }>
}

export default async function countNodeFeeds (
  elastic: ElasticClient,
  domain: string
): Promise<NodeStats> {
  await elastic.indices.refresh({ index: feedIndex })
  const response = await elastic.search<Feed>({
    index: feedIndex,
    query: {
      term: { domain }
    },
    size: 0,
    aggs: {
      types: {
        terms: {
          field: 'type'
        }
      }
    }
  })
  const types = response?.aggregations?.types as Aggregation
  const result: NodeStats = {
    channel: 0,
    account: 0
  }
  types.buckets.forEach((item) => {
    result[item.key] += item.doc_count
  })
  return result
}
