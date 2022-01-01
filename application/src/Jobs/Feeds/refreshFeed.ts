import { PrismaClient, Feed, Node } from '@prisma/client'
import { FeedData } from '../../Fediverse/Providers/FeedData'
import { createMissingTags } from '../../Storage/Tags/createMissingTags'
import { createFeedTags } from '../../Storage/Tags/createFeedTags'
import { fetchTags } from '../../Storage/Tags/fetchTags'
import { extractTags } from '../../StringTools/extractTags'
import { extractEmails } from '../../StringTools/extractEmails'
import { createFeedFields } from '../../Storage/Fields/createFeedFields'
import { createFeedEmails } from '../../Storage/Emails/createFeedEmails'
import { deleteAllFeedFields } from '../../Storage/Fields/deleteAllFeedFields'
import { deleteAllFeedTags } from '../../Storage/Tags/deleteAllFeedTags'
import { deleteAllFeedEmails } from '../../Storage/Emails/deleteAllFeedEmails'
import { updateFeed } from '../../Storage/Feeds/updateFeed'
import prepareFulltext from './prepareFulltext'

export const refreshFeed = async (prisma: PrismaClient, feed:Feed, feedData: FeedData, node: Node): Promise<Feed> => {
  const fulltext = prepareFulltext(feedData, node)

  await deleteAllFeedFields(prisma, feed)
  await createFeedFields(prisma, feed, feedData.fields)

  const tagNames = extractTags(fulltext)
  await createMissingTags(prisma, tagNames)
  const tags = await fetchTags(prisma, tagNames)
  await deleteAllFeedTags(prisma, feed)
  await createFeedTags(prisma, feed, tags)

  const emails = extractEmails(fulltext)
  await deleteAllFeedEmails(prisma, feed)
  await createFeedEmails(prisma, feed, emails)

  return await updateFeed(prisma, feed, { ...feedData, fulltext })
}
