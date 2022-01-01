import { Node, PrismaClient, Feed } from '@prisma/client'
import { FeedData } from '../../Fediverse/Providers/FeedData'
import { createMissingTags } from '../../Storage/Tags/createMissingTags'
import { createFeedTags } from '../../Storage/Tags/createFeedTags'
import { fetchTags } from '../../Storage/Tags/fetchTags'
import { extractTags } from '../../StringTools/extractTags'
import { extractEmails } from '../../StringTools/extractEmails'
import { createFeedFields } from '../../Storage/Fields/createFeedFields'
import { createFeedEmails } from '../../Storage/Emails/createFeedEmails'
import { createFeed } from '../../Storage/Feeds/createFeed'
import prepareFulltext from './prepareFulltext'

export const addFeed = async (prisma: PrismaClient, node: Node, feedData: FeedData): Promise<Feed> => {
  const fulltext = prepareFulltext(feedData, node)
  const feed = await createFeed(prisma, { ...feedData, fulltext }, node)

  await createFeedFields(prisma, feed, feedData.fields)

  const tagNames = extractTags(fulltext)
  await createMissingTags(prisma, tagNames)
  const tags = await fetchTags(prisma, tagNames)
  await createFeedTags(prisma, feed, tags)

  const emails = extractEmails(fulltext)
  await createFeedEmails(prisma, feed, emails)

  return feed
}
