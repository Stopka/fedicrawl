import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import getTimeoutMilliseconds from '../../getTimeoutMilliseconds.js'
import { FeedProviderMethod } from '../FeedProviderMethod'
import { NoMoreFeedsError } from '../NoMoreFeedsError'
import { FeedData } from '../FeedData'

const limit = 40

const emojiSchema = z.object({
  shortcode: z.string(),
  url: z.string()
})

const schema = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
    display_name: z.string(),
    locked: z.boolean(),
    bot: z.boolean(),
    created_at: z.string(),
    note: z.string(),
    url: z.string(),
    avatar: z.string(),
    followers_count: z.number(),
    following_count: z.number(),
    statuses_count: z.number(),
    last_status_at: z.nullable(z.string()),
    emojis: z.array(emojiSchema),
    fields: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
        verified_at: z.nullable(z.string())
      })
    ),
    noindex: z.boolean().optional().nullable()
  })
)

type Emoji = z.infer<typeof emojiSchema>

const replaceEmojis = (text: string, emojis: Emoji[]): string => {
  emojis.forEach((emoji) => {
    text = text.replace(
      RegExp(`:${emoji.shortcode}:`, 'gi'),
      `<img draggable="false" class="emoji" title="${emoji.shortcode}" alt="${emoji.shortcode}" src="${emoji.url}" />`
    )
  })
  return text
}

export const retrieveLocalPublicUsersPage: FeedProviderMethod = async (
  domain,
  page,
  robotsTxt
): Promise<FeedData[]> => {
  const response = await robotsTxt.getIfAllowed(new URL(`https://${domain}/api/v1/directory`), {
    params: {
      limit,
      offset: page * limit,
      local: true
    },
    timeout: getTimeoutMilliseconds(domain)
  })
  assertSuccessJsonResponse(response)
  const responseData = schema.parse(response.data)
  if (responseData.length === 0) {
    throw new NoMoreFeedsError('user')
  }
  return responseData.map((item) => {
    return {
      name: item.username,
      displayName: replaceEmojis(item.display_name, item.emojis),
      description: replaceEmojis(item.note, item.emojis),
      followersCount: item.followers_count,
      followingCount: item.following_count,
      statusesCount: item.statuses_count,
      bot: item.bot,
      url: item.url,
      avatar: item.avatar,
      locked: item.locked,
      lastStatusAt:
        item.last_status_at !== null
          ? new Date(item.last_status_at)
          : undefined,
      createdAt: new Date(item.created_at),
      fields: item.fields.map((field) => {
        return {
          name: replaceEmojis(field.name, item.emojis),
          value: replaceEmojis(field.value, item.emojis),
          verifiedAt:
            field.verified_at !== null ? new Date(field.verified_at) : undefined
        }
      }),
      type: 'account',
      parentFeed: undefined,
      indexable: !(item.noindex ?? false)
    }
  })
}
