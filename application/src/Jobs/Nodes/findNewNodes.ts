import { NodeProvider } from '../../Fediverse/Providers/NodeProvider'
import RobotsTxt from '../../Fediverse/RobotsTxt/RobotsTxt.js'
import { findNewNodesOnPage } from './findNewNodesOnPage'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const findNewNodes = async (
  elastic: ElasticClient,
  provider: NodeProvider,
  node: Node,
  robotsTxt: RobotsTxt
): Promise<void> => {
  try {
    // noinspection InfiniteLoopJS
    for (let page = 0; true; page++) {
      console.info('Retrieve node page', {
        domain: node.domain,
        provider: provider.getKey()
      })
      await findNewNodesOnPage(elastic, provider, node, page, robotsTxt)
    }
  } catch (error) {
    console.info('Node search finished', {
      error,
      domain: node.domain,
      provider: provider.getKey()
    })
  }
}
