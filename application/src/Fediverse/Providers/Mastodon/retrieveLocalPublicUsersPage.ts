import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { FeedData } from '../FeedData'
import { string, z } from 'zod'

const limit = 500

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
    )
  })
)

type Emoji = z.infer<typeof emojiSchema>

const replaceEmojis = (text: string, emojis: Emoji[]): string => {
  emojis.forEach(emoji => {
    text = text.replace(
      RegExp(`:${emoji.shortcode}:`, 'gi'),
            `<img draggable="false" class="emoji" title="${emoji.shortcode}" alt="${emoji.shortcode}" src="${emoji.url}" />`
    )
  })
  return text
}

export const retrieveLocalPublicUsersPage = async (domain: string, page: number): Promise<FeedData[]> => {
  try {
    const response = await axios.get('https://' + domain + '/api/v1/directory', {
      params: {
        limit: limit,
        offset: page * limit,
        local: true
      },
      timeout: 10000
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
          displayName: replaceEmojis(item.display_name, item.emojis),
          description: replaceEmojis(item.note, item.emojis),
          followersCount: item.followers_count,
          followingCount: item.following_count,
          statusesCount: item.statuses_count,
          bot: item.bot,
          url: item.url,
          avatar: item.avatar,
          locked: item.locked,
          lastStatusAt: item.last_status_at !== null ? new Date(item.last_status_at) : null,
          createdAt: new Date(item.created_at),
          fields: item.fields.map(field => {
            return {
              name: replaceEmojis(field.name, item.emojis),
              value: replaceEmojis(field.value, item.emojis),
              verifiedAt: field.verified_at !== null ? new Date(field.verified_at) : null
            }
          }),
          type: 'account',
          parentFeed: null
        }
      }
    )
  } catch (error) {
    throw new Error('Invalid response: ' + error)
  }
}
