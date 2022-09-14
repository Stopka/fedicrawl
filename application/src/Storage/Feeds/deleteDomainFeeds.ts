import { ElasticClient } from '../ElasticClient'
import feedIndex from '../Definitions/feedIndex'

export const deleteDomainFeeds = async (elastic: ElasticClient, domains:string[]): Promise<number> => {
  await elastic.indices.refresh({ index: feedIndex })
  const result = await elastic.deleteByQuery({
    index: feedIndex,
    query: {
      bool: {
        should: domains.map(domain => {
          return {
            regexp: {
              domain: {
                value: '(.*\\.)?' + domain,
                case_insensitive: true
              }
            }
          }
        }),
        minimum_should_match: 1
      }
    }
  })
  console.info('Deleted domain feeds', {
    count: result.deleted, domains
  })
  return result.deleted
}
