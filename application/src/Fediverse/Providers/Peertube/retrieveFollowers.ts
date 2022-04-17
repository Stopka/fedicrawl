import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { getDefaultTimeoutMilliseconds } from '../../getDefaultTimeoutMilliseconds'
import { NodeProviderMethod } from '../NodeProviderMethod'
import { NoMoreNodesError } from '../NoMoreNodesError'

const limit = 100

const schema = z.object({
  total: z.number(),
  data: z.array(
    z.object({
      follower: z.object({
        host: z.string()
      }),
      following: z.object({
        host: z.string()
      })
    })
  )
})

export const retrieveFollowers:NodeProviderMethod = async (domain, page) => {
  const response = await axios.get(`https://${domain}/api/v1/server/followers`, {
    params: {
      count: limit,
      sort: 'createdAt',
      start: page * limit
    },
    timeout: getDefaultTimeoutMilliseconds()
  })
  assertSuccessJsonResponse(response)
  const responseData = schema.parse(response.data)
  const hosts = new Set<string>()
  responseData.data.forEach(item => {
    hosts.add(item.follower.host)
    hosts.add(item.following.host)
  })
  if (hosts.size === 0) {
    throw new NoMoreNodesError('follower')
  }
  return Array.from(hosts)
}
