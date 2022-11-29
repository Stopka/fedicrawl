import getTimeoutMilliseconds from '../../getTimeoutMilliseconds.js'
import { FeedData } from '../FeedData'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { avatarSchema } from './Avatar'
import { parseAvatarUrl } from './parseAvatarUrl'
import { parseDescription } from './parseDescription'
import { NoMoreFeedsError } from '../NoMoreFeedsError'
import { FeedProviderMethod } from '../FeedProviderMethod'

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

export const retrieveAccounts: FeedProviderMethod = async (domain, page, robotsTxt) => {
  const response = await robotsTxt.getIfAllowed(new URL(`https://${domain}/api/v1/accounts`), {
    params: {
      count: limit,
      sort: 'createdAt',
      start: page * limit
    },
    timeout: getTimeoutMilliseconds(domain)
  })
  assertSuccessJsonResponse(response)
  const responseData = schema.parse(response.data)
  if (responseData.data.length === 0) {
    throw new NoMoreFeedsError('account')
  }
  return responseData.data
    .filter((item) => item.host === domain)
    .map((item): FeedData => {
      return {
        name: item.name,
        url: item.url ?? `https://${domain}/accounts/${item.name}/`,
        avatar: parseAvatarUrl(item.avatar, domain),
        locked: false,
        fields: [],
        description: parseDescription(item.description),
        displayName: item.displayName,
        followersCount: item.followersCount,
        followingCount: item.followingCount,
        createdAt: new Date(item.createdAt),
        bot: undefined,
        lastStatusAt: undefined,
        statusesCount: undefined,
        type: 'account',
        parentFeed: undefined,
        indexable: true
      }
    })
}
