import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import Node from '../Definitions/Node'

const findNodeWithOldestRefreshWithLimits = async (elastic: ElasticClient): Promise<Node | null> => {
  const currentTimestamp = Date.now()
  const attemptLimitMilliseconds = parseInt(process.env.REATTEMPT_MINUTES ?? '60') * 60 * 1000
  const attemptLimitDate = new Date(currentTimestamp - attemptLimitMilliseconds)
  const refreshLimitMilliseconds = parseInt(process.env.REFRESH_HOURS ?? '168') * 60 * 60 * 1000
  const refreshLimitDate = new Date(currentTimestamp - refreshLimitMilliseconds)
  console.log('Searching instance not refreshed for longest time and before refreshLimit and attemptLimit', {
    refreshLimitMilliseconds,
    refreshLimitDate,
    attemptLimitDate,
    attemptLimitMilliseconds
  })
  const result = await elastic.search<Node>({
    index: nodeIndex,
    body: {
      size: 1,
      sort: [{
        refreshedAt: { order: 'asc' }
      }],
      query: {
        bool: {
          must: [
            { range: { refreshedAt: { lt: refreshLimitDate.getTime() } } }
          ],
          should: [
            { range: { refreshAttemptedAt: { lt: attemptLimitDate.getTime() } } },
            { bool: { must_not: [{ exists: { field: 'refreshAttemptedAt' } }] } }
          ],
          minimum_should_match: 1
        }
      }
    }
  })
  if (result.hits.hits.length > 0) {
    const node = result.hits.hits[0]._source
    console.log('Found oldest node', { node })
    return node
  }
  return null
}
export default findNodeWithOldestRefreshWithLimits
