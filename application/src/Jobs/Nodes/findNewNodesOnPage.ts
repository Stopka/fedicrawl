import RobotsTxt from '../../Fediverse/RobotsTxt/RobotsTxt.js'
import { createMissingNodes } from '../../Storage/Nodes/createMissingNodes'
import { NodeProvider } from '../../Fediverse/Providers/NodeProvider'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'
import isDomainNotBanned from '../../Storage/Nodes/isDomainNotBanned'

export const findNewNodesOnPage = async (
  elastic: ElasticClient,
  provider: NodeProvider,
  node: Node,
  page: number,
  robotsTxt: RobotsTxt
): Promise<number> => {
  let domains = await provider.retrieveNodes(node.domain, page, robotsTxt)
  domains = domains.filter(isDomainNotBanned)
  console.log('Found nodes', {
    count: domains.length,
    domain: node.domain,
    provider: provider.getKey(),
    page
  })
  return await createMissingNodes(elastic, domains, node.domain)
}
