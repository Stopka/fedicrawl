import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import Node from '../Definitions/Node'

const findNotProcessedNodeWithAttemptLimit = async (
  elastic: ElasticClient
): Promise<Node | null> => {
  const currentTimestamp = Date.now()
  const attemptLimitMilliseconds =
    parseInt(process.env.REATTEMPT_MINUTES ?? '60') * 60 * 1000
  const attemptLimitDate = new Date(currentTimestamp - attemptLimitMilliseconds)
  console.log(
    'Searching for not yet processed node not attempted before attemptLimit',
    { attemptLimitDate, attemptLimitMilliseconds }
  )
  const result = await elastic.search<Node>({
    index: nodeIndex,
    body: {
      size: 1,
      sort: [
        {
          foundAt: { order: 'asc' }
        }
      ],
      query: {
        bool: {
          must_not: [{ exists: { field: 'refreshedAt' } }],
          should: [
            {
              bool: { must_not: [{ exists: { field: 'refreshAttemptedAt' } }] }
            },
            {
              range: { refreshAttemptedAt: { lt: attemptLimitDate.getTime() } }
            }
          ],
          minimum_should_match: 1
        }
      }
    }
  })
  const node = result.hits.hits.pop()?._source
  if (node !== undefined) {
    console.log('Found not yet processed node', { node })
    return node
  }
  return null
}
export default findNotProcessedNodeWithAttemptLimit
