import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { getDefaultTimeoutMilliseconds } from '../../getDefaultTimeoutMilliseconds'
import { NoMoreFeedsError } from '../NoMoreFeedsError'
import { FeedProviderMethod } from '../FeedProviderMethod'
import { FeedData } from '../FeedData'
import { FieldData } from '../FieldData'

const limit = 100

const emojiSchema = z.object({
  name: z.string(),
  url: z.string()
})

const schema = z.array(
  z.object({
    id: z.string(),
    name: z.string().nullable(),
    username: z.string(),
    avatarUrl: z.string().nullable(),
    isBot: z.boolean(),
    emojis: z.array(emojiSchema),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    isLocked: z.boolean(),
    description: z.string().nullable(),
    location: z.string().nullable(),
    birthday: z.string().nullable(),
    lang: z.string().nullable(),
    fields: z.array(
      z.object({
        name: z.string(),
        value: z.string()
      })
    ),
    followersCount: z.number(),
    followingCount: z.number(),
    notesCount: z.number()
  })
)

type Emoji = z.infer<typeof emojiSchema>

const replaceEmojis = (text: string, emojis: Emoji[]): string => {
  emojis.forEach((emoji) => {
    text = text.replace(
      RegExp(`:${emoji.name}:`, 'gi'),
      `<img draggable="false" class="emoji" title="${emoji.name}" alt="${emoji.name}" src="${emoji.url}" />`
    )
  })
  return text
}

const parseDescription = (description: string | null): string => {
  if (typeof description !== 'string') {
    return ''
  }
  return description
    .split('\n\n')
    .map((paragraph) => {
      paragraph = paragraph.replace('\n', '</br>\n')
      return `<p>${paragraph}</p>`
    })
    .join('\n')
}

export const retrieveUsersPage: FeedProviderMethod = async (
  domain,
  page,
  robotsTxt
): Promise<FeedData[]> => {
  const response = await robotsTxt.postIfAllowed(
    `https://${domain}/api/users`,
    {
      state: 'all',
      origin: 'local',
      sort: '+createdAt',
      limit,
      offset: limit * page
    },
    {
      timeout: getDefaultTimeoutMilliseconds()
    }
  )
  assertSuccessJsonResponse(response)
  const responseData = schema.parse(response.data)
  if (responseData.length === 0) {
    throw new NoMoreFeedsError('user')
  }
  return responseData.map((item) => {
    return {
      name: item.username,
      displayName: replaceEmojis(item.name ?? item.username, item.emojis),
      description: replaceEmojis(
        parseDescription(item.description ?? ''),
        item.emojis
      ),
      followersCount: item.followersCount,
      followingCount: item.followingCount,
      statusesCount: item.notesCount,
      bot: item.isBot,
      url: `https://${domain}/@${item.username}`,
      avatar: item.avatarUrl ?? undefined,
      locked: item.isLocked,
      lastStatusAt:
        item.updatedAt !== null ? new Date(item.updatedAt) : undefined,
      createdAt: new Date(item.createdAt),
      fields: [
        ...item.fields.map((field) => {
          return {
            name: replaceEmojis(field.name, item.emojis),
            value: replaceEmojis(field.value, item.emojis),
            verifiedAt: undefined
          }
        }),
        ...([
          { name: 'Location', value: item.location, verifiedAt: undefined },
          { name: 'Birthday', value: item.birthday, verifiedAt: undefined },
          { name: 'Language', value: item.lang, verifiedAt: undefined }
        ].filter((field) => field.value !== null) as FieldData[])
      ],
      type: 'account',
      parentFeed: undefined,
      indexable: true
    }
  })
}
