import axios from 'axios'
import { assertSuccessJsonResponse } from '../assertSuccessJsonResponse'
import { z } from 'zod'
import { getDefaultTimeoutMilliseconds } from '../getDefaultTimeoutMilliseconds'

const wellKnownSchema = z.object({
  links: z.array(
    z.object({
      rel: z.string(),
      href: z.string()
    })
  )
})

export type WellKnown = z.infer<typeof wellKnownSchema>

export const retrieveWellKnown = async (domain: string): Promise<WellKnown> => {
  console.info('Retrieving well known', { domain: domain })
  const wellKnownUrl = `https://${domain}/.well-known/nodeinfo`
  const wellKnownResponse = await axios.get(wellKnownUrl, {
    timeout: getDefaultTimeoutMilliseconds(),
    maxContentLength: 5000
  })
  assertSuccessJsonResponse(wellKnownResponse)
  return wellKnownSchema.parse(wellKnownResponse.data)
}
