import { FeedData } from '../../Fediverse/Providers/FeedData'
import { refreshFeed } from './refreshFeed'
import { addFeed } from './addFeed'
import Feed from '../../Storage/Definitions/Feed'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'
import getFeed from '../../Storage/Feeds/getFeed'

export const refreshOrAddFeed = async (
  elastic: ElasticClient,
  node: Node,
  feedData: FeedData
): Promise<Feed> => {
  let feed: Feed | null | undefined
  try {
    feed = await getFeed(elastic, `${feedData.name}@${node.domain}`)
  } catch (e) {}
  if (feed !== null && feed !== undefined) {
    console.info('Refreshing feed', {
      nodeDomain: node.domain,
      feedName: feedData.name,
      feedType: feedData.type
    })
    return await refreshFeed(elastic, feed, feedData, node)
  }
  console.info('Adding feed', {
    nodeDomain: node.domain,
    feedName: feedData.name,
    feedType: feedData.type
  })
  return await addFeed(elastic, node, feedData)
}
