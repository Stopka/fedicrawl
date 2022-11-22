import RobotsTxt from '../../Fediverse/RobotsTxt/RobotsTxt.js'
import { refreshFeedsOnPage } from './refreshFeedsOnPage'
import { FeedProvider } from '../../Fediverse/Providers/FeedProvider'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const refreshFeeds = async (
  elastic: ElasticClient,
  provider: FeedProvider,
  node: Node,
  robotsTxt: RobotsTxt
): Promise<void> => {
  try {
    // noinspection InfiniteLoopJS
    for (let page = 0; true; page++) {
      console.info('Retrieve feeds page', {
        nodeDomain: node.domain,
        provider: provider.getKey(),
        page
      })
      await refreshFeedsOnPage(elastic, provider, node, page, robotsTxt)
    }
  } catch (error) {
    console.info('Feed search finished', {
      error,
      nodeDomain: node.domain,
      provider: provider.getKey()
    })
  }
}
