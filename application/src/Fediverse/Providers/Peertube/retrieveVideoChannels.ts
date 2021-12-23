import { FeedData } from '../FeedData'
import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { FieldData } from '../FieldData'
import { avatarSchema } from './Avatar'
import { parseAvatarUrl } from './parseAvatarUrl'

const limit = 100

const schema = z.object({
  total: z.number(),
  data: z.array(
    z.object({
      displayName: z.string(),
      description: z.nullable(z.string()),
      isLocal: z.boolean(),
      url: z.optional(z.string()),
      name: z.string(),
      support: z.nullable(z.string()),
      followingCount: z.number(),
      followersCount: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
      host: z.string(),
      avatar: avatarSchema,
      ownerAccount: z.object({
        name: z.string(),
        host: z.string()
      })
    })
  )
})

export const retrieveVideoChannels = async (domain: string, page: number): Promise<FeedData[]> => {
  const response = await axios.get(`https://${domain}/api/v1/video-channels`, {
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
    throw new Error('No more channels')
  }
  return responseData.data
    .filter(item => item.host === domain)
    .map((item):FeedData => {
      const fields:FieldData[] = item.support
        ? [{ name: 'support', value: item.support, verifiedAt: null }]
        : []
      return {
        name: item.name,
        url: item.url ?? `https://${domain}/video-channels/${item.name}/`,
        avatar: parseAvatarUrl(item.avatar, domain),
        locked: false,
        fields: fields,
        description: item.description ?? '',
        displayName: item.displayName,
        followersCount: item.followersCount,
        followingCount: item.followingCount,
        createdAt: new Date(item.createdAt),
        bot: null,
        lastStatusAt: null,
        statusesCount: null,
        type: 'channel',
        parentFeed: {
          name: item.ownerAccount.name,
          hostDomain: item.ownerAccount.host
        }
      }
    })
}
