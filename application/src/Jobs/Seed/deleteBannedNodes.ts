import { deleteDomainFeeds } from '../../Storage/Feeds/deleteDomainFeeds'
import { deleteDomainNodes } from '../../Storage/Nodes/deleteDomainNodes'
import { ElasticClient } from '../../Storage/ElasticClient'

export default async function deleteDomains (
  elastic: ElasticClient,
  domains: string[]
): Promise<number> {
  if (domains.length === 0) {
    return 0
  }
  await deleteDomainFeeds(elastic, domains)
  return await deleteDomainNodes(elastic, domains)
}
