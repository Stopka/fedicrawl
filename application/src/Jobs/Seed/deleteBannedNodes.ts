import { deleteDomainFeeds } from '../../Storage/Feeds/deleteDomainFeeds'
import { deleteDomainNodes } from '../../Storage/Nodes/deleteDomainNodes'
import { ElasticClient } from '../../Storage/ElasticClient'

export default async function deleteDomains (elastic: ElasticClient, domains:string[]):Promise<number> {
  if (domains === []) {
    return
  }
  await deleteDomainFeeds(elastic, domains)
  return deleteDomainNodes(elastic, domains)
}
