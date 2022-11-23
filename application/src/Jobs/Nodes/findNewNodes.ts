import getMaxCrawlingDepth from '../../Fediverse/getMaxCrawlingDepth.js'
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
  const maxCrawlingDepth = getMaxCrawlingDepth()
  if (maxCrawlingDepth !== undefined && node.crawlingDepth >= maxCrawlingDepth) {
    console.info('Skipping finding nodes, max crawling depth reached', {
      maxCrawlingDepth
    })
    return
  }
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
