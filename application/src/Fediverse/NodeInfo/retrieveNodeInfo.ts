import axios from 'axios'
import { z } from 'zod'
import { assertSuccessJsonResponse } from '../assertSuccessJsonResponse'
import { getDefaultTimeoutMilliseconds } from '../getDefaultTimeoutMilliseconds'

const schema = z.object({
  name: z.string().optional(),
  software: z.object({
    name: z.string(),
    version: z.string()
  }),
  protocols: z.array(
    z.string()
  ),
  usage: z.optional(z.object({
    users: z.optional(z.object({
      total: z.optional(z.number()),
      activeMonth: z.optional(z.number()),
      activeHalfyear: z.optional(z.number())
    })),
    localPosts: z.optional(z.number())
  })),
  openRegistrations: z.optional(z.boolean())
})

export type NodeInfo = z.infer<typeof schema>

export const retrieveNodeInfo = async (url: string): Promise<NodeInfo> => {
  console.info('Retrieving node info', { url: url })
  const nodeInfoResponse = await axios.get(url, {
    timeout: getDefaultTimeoutMilliseconds()
  })
  assertSuccessJsonResponse(nodeInfoResponse)
  return schema.parse(nodeInfoResponse.data)
}
