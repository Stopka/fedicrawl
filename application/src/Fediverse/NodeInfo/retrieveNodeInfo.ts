import { z } from 'zod'
import { assertSuccessJsonResponse } from '../assertSuccessJsonResponse'
import getTimeoutMilliseconds from '../getTimeoutMilliseconds.js'
import RobotsTxt from '../RobotsTxt/RobotsTxt.js'

const schema = z.object({
  name: z.string().optional(),
  software: z.object({
    name: z.string(),
    version: z.string()
  }),
  protocols: z.array(z.string()),
  usage: z.optional(
    z.object({
      users: z.optional(
        z.object({
          total: z.optional(z.number()),
          activeMonth: z.optional(z.number()),
          activeHalfyear: z.optional(z.number())
        })
      ),
      localPosts: z.optional(z.number())
    })
  ),
  openRegistrations: z.optional(z.boolean())
})

export type NodeInfo = z.infer<typeof schema>

export const retrieveNodeInfo = async (url: URL, robotsTxt: RobotsTxt): Promise<NodeInfo> => {
  console.info('Retrieving node info', { url })
  const nodeInfoResponse = await robotsTxt.getIfAllowed(url, {
    timeout: getTimeoutMilliseconds(url.hostname)
  })
  assertSuccessJsonResponse(nodeInfoResponse)
  return schema.parse(nodeInfoResponse.data)
}
