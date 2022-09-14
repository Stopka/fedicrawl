import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'

export const deleteDomainNodes = async (elastic: ElasticClient, domains:string[]): Promise<number> => {
  await elastic.indices.refresh({ index: nodeIndex })
  const result = await elastic.deleteByQuery({
    index: nodeIndex,
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
  console.info('Deleted domain nodes', {
    count: result.deleted, domains
  })
  return result.deleted
}
