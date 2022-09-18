import StorageFeedData from './StorageFeedData'
import Feed from '../Definitions/Feed'
import { ElasticClient } from '../ElasticClient'
import feedIndex from '../Definitions/feedIndex'
import getFeed from './getFeed'
import assertDefined from '../assertDefined'

export const updateFeed = async (
  elastic: ElasticClient,
  feed: Feed,
  feedData: StorageFeedData
): Promise<Feed> => {
  await elastic.update<Feed>({
    index: feedIndex,
    id: feed.fullName,
    doc: {
      url: feedData.url,
      bot: feedData.bot,
      avatar: feedData.avatar,
      followersCount: feedData.followersCount,
      followingCount: feedData.followingCount,
      statusesCount: feedData.statusesCount,
      lastStatusAt: feedData.lastStatusAt,
      description: feedData.description,
      displayName: feedData.displayName,
      locked: feedData.locked,
      createdAt: feedData.createdAt,
      refreshedAt: new Date().getTime(),
      type: feedData.type,
      fields: feedData.fields.map((field) => {
        return { name: field.name, value: field.value }
      }),
      extractedEmails: feedData.extractedEmails,
      extractedTags: feedData.extractedTags
    }
  })
  console.info('Updated feed', { feedName: feed.name, nodeDomain: feed.domain })
  return assertDefined(
    await getFeed(elastic, feed.fullName),
    'Missing updated feed'
  )
}
