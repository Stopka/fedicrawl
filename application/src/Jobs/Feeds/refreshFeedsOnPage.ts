import RobotsTxt from '../../Fediverse/RobotsTxt/RobotsTxt.js'
import { refreshOrAddFeed } from './refreshOrAddFeed'
import { FeedProvider } from '../../Fediverse/Providers/FeedProvider'
import Node from '../../Storage/Definitions/Node'
import Feed from '../../Storage/Definitions/Feed'
import { ElasticClient } from '../../Storage/ElasticClient'

export const refreshFeedsOnPage = async (
  elastic: ElasticClient,
  provider: FeedProvider,
  node: Node,
  page: number,
  robotsTxt: RobotsTxt
): Promise<Feed[]> => {
  const feedData = await provider.retrieveFeeds(node.domain, page, robotsTxt)
  const indexableFeedData = feedData.filter(item => item.indexable)
  console.info('Retrieved feeds', {
    count: feedData.length,
    indexableCount: indexableFeedData.length,
    domain: node.domain,
    provider: provider.getKey(),
    page
  })
  return await Promise.all(
    indexableFeedData.map(
      async (feedDataItem) =>
        await refreshOrAddFeed(elastic, node, feedDataItem)
    )
  )
}
