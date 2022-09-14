import { refreshFeedsOnPage } from './refreshFeedsOnPage'
import { FeedProvider } from '../../Fediverse/Providers/FeedProvider'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const refreshFeeds = async (elastic: ElasticClient, provider:FeedProvider, node:Node):Promise<void> => {
  try {
    for (let page = 0; true; page++) {
      console.info('Retrieve feeds page', { nodeDomain: node.domain, provider: provider.getKey(), page: page })
      await refreshFeedsOnPage(elastic, provider, node, page)
    }
  } catch (e) {
    console.info('Feed search finished: ' + e, { nodeDomain: node.domain, provider: provider.getKey() })
  }
}
