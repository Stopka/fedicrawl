import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { FeedData } from '../FeedData'
import { z } from 'zod'
import { getDefaultTimeoutMilliseconds } from '../../getDefaultTimeoutMilliseconds'

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
  emojis.forEach(emoji => {
    text = text.replace(
      RegExp(`:${emoji.name}:`, 'gi'),
            `<img draggable="false" class="emoji" title="${emoji.name}" alt="${emoji.name}" src="${emoji.url}" />`
    )
  })
  return text
}

const parseDescription = (description:string|null):string => {
  if (typeof description !== 'string') {
    return ''
  }
  return description.split('\n\n').map(paragraph => {
    paragraph = paragraph.replace('\n', '</br>\n')
    return `<p>${paragraph}</p>`
  }).join('\n')
}

export const retrieveUsersPage = async (domain: string, page: number): Promise<FeedData[]> => {
  try {
    const response = await axios.post('https://' + domain + '/api/users', {
      state: 'all',
      origin: 'local',
      sort: '+createdAt',
      limit: limit,
      offset: limit * page
    }, {
      timeout: getDefaultTimeoutMilliseconds()
    })
    assertSuccessJsonResponse(response)
    const responseData = schema.parse(response.data)
    if (responseData.length === 0) {
      throw new Error('No more users')
    }
    return responseData.map(
      item => {
        return {
          name: item.username,
          displayName: replaceEmojis(item.name ?? item.username, item.emojis),
          description: replaceEmojis(parseDescription(item.description ?? ''), item.emojis),
          followersCount: item.followersCount,
          followingCount: item.followingCount,
          statusesCount: item.notesCount,
          bot: item.isBot,
          url: `https://${domain}/@${item.username}`,
          avatar: item.avatarUrl,
          locked: item.isLocked,
          lastStatusAt: item.updatedAt !== null ? new Date(item.updatedAt) : null,
          createdAt: new Date(item.createdAt),
          fields: [
            ...item.fields.map(field => {
              return {
                name: replaceEmojis(field.name, item.emojis),
                value: replaceEmojis(field.value, item.emojis),
                verifiedAt: null
              }
            }),
            ...[
              { name: 'Location', value: item.location, verifiedAt: null },
              { name: 'Birthday', value: item.birthday, verifiedAt: null },
              { name: 'Language', value: item.lang, verifiedAt: null }
            ].filter(field => field.value !== null)
          ],
          type: 'account',
          parentFeed: null
        }
      }
    )
  } catch (error) {
    throw new Error('Invalid response: ' + error)
  }
}
