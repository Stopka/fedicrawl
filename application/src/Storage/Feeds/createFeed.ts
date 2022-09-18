import StorageFeedData from './StorageFeedData'
import { ElasticClient } from '../ElasticClient'
import feedIndex from '../Definitions/feedIndex'
import getFeed from './getFeed'
import Feed from '../Definitions/Feed'
import Node from '../Definitions/Node'
import assertDefined from '../assertDefined'

export const createFeed = async (
  elastic: ElasticClient,
  feedData: StorageFeedData,
  node: Node
): Promise<Feed> => {
  const fullName = `${feedData.name}@${node.domain}`
  await elastic.create<Feed>({
    index: feedIndex,
    id: fullName,
    document: {
      fullName,
      domain: node.domain,
      url: feedData.url,
      name: feedData.name,
      bot: feedData.bot,
      avatar: feedData.avatar,
      followersCount: feedData.followersCount,
      followingCount: feedData.followingCount,
      statusesCount: feedData.statusesCount,
      lastStatusAt: feedData.lastStatusAt?.getTime(),
      description: feedData.description,
      displayName: feedData.displayName,
      locked: feedData.locked,
      createdAt: feedData.createdAt.getTime(),
      foundAt: new Date().getTime(),
      fields: feedData.fields.map((field) => {
        return { name: field.name, value: field.value }
      }),
      extractedEmails: feedData.extractedEmails,
      extractedTags: feedData.extractedTags,
      parentFeedName: feedData.parentFeed?.name,
      parentFeedDomain: feedData.parentFeed?.hostDomain,
      type: feedData.type
    }
  })
  console.info('Created new feed', {
    feedName: feedData.name,
    nodeDomain: node.domain
  })
  return assertDefined(
    await getFeed(elastic, fullName),
    'Missing feed after creating it'
  )
}
