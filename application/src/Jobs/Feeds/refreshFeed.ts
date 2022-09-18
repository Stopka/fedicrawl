import { FeedData } from '../../Fediverse/Providers/FeedData'
import { extractTags } from '../../StringTools/extractTags'
import { extractEmails } from '../../StringTools/extractEmails'
import { updateFeed } from '../../Storage/Feeds/updateFeed'
import Feed from '../../Storage/Definitions/Feed'
import Node from '../../Storage/Definitions/Node'
import prepareFulltext from './prepareFulltext'
import { ElasticClient } from '../../Storage/ElasticClient'

export const refreshFeed = async (
  elastic: ElasticClient,
  feed: Feed,
  feedData: FeedData,
  node: Node
): Promise<Feed> => {
  const fulltext = prepareFulltext(feedData, node)

  const extractedTags = extractTags(fulltext)
  const extractedEmails = extractEmails(fulltext)

  return await updateFeed(elastic, feed, {
    ...feedData,
    extractedTags,
    extractedEmails
  })
}
