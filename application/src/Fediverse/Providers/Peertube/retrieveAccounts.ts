import { FeedData } from '../FeedData'
import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { avatarSchema } from './Avatar'
import { parseAvatarUrl } from './parseAvatarUrl'

const limit = 100

const schema = z.object({
  total: z.number(),
  data: z.array(
    z.object({
      displayName: z.string(),
      description: z.nullable(z.string()),
      url: z.optional(z.string()),
      name: z.string(),
      followingCount: z.number(),
      followersCount: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
      host: z.string(),
      avatar: avatarSchema
    })
  )
})

export const retrieveAccounts = async (domain: string, page: number): Promise<FeedData[]> => {
  const response = await axios.get(`https://${domain}/api/v1/accounts`, {
    params: {
      count: limit,
      sort: 'createdAt',
      start: page * limit
    },
    timeout: 10000
  })
  assertSuccessJsonResponse(response)
  const responseData = schema.parse(response.data)
  if (responseData.data.length === 0) {
    throw new Error('No more accounts')
  }
  return responseData.data
    .filter(item => item.host === domain)
    .map((item):FeedData => {
      return {
        name: item.name,
        url: item.url ?? `https://${domain}/accounts/${item.name}/`,
        avatar: parseAvatarUrl(item.avatar, domain),
        locked: false,
        fields: [],
        description: item.description ?? '',
        displayName: item.displayName,
        followersCount: item.followersCount,
        followingCount: item.followingCount,
        createdAt: new Date(item.createdAt),
        bot: null,
        lastStatusAt: null,
        statusesCount: null,
        type: 'account',
        parentFeed: null
      }
    })
}
