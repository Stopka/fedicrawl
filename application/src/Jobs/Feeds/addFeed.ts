import { FeedData } from '../../Fediverse/Providers/FeedData'
import { extractTags } from '../../Utils/extractTags'
import { extractEmails } from '../../Utils/extractEmails'
import { createFeed } from '../../Storage/Feeds/createFeed'
import prepareFulltext from './prepareFulltext'
import Feed from '../../Storage/Definitions/Feed'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const addFeed = async (
  elastic: ElasticClient,
  node: Node,
  feedData: FeedData
): Promise<Feed> => {
  const fulltext = prepareFulltext(feedData, node)
  const extractedTags = extractTags(fulltext)
  const extractedEmails = extractEmails(fulltext)
  return await createFeed(
    elastic,
    { ...feedData, extractedTags, extractedEmails },
    node
  )
}
