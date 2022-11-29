import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import getTimeoutMilliseconds from '../../getTimeoutMilliseconds.js'
import { NodeProviderMethod } from '../NodeProviderMethod'
import { NoMoreNodesError } from '../NoMoreNodesError'

const schema = z.array(z.string())

export const retrievePeers: NodeProviderMethod = async (domain, page, robotsTxt) => {
  if (page !== 0) {
    throw new NoMoreNodesError('peer')
  }
  const response = await robotsTxt.getIfAllowed(
    new URL(`https://${domain}/api/v1/instance/peers`),
    {
      timeout: getTimeoutMilliseconds(domain)
    }
  )
  assertSuccessJsonResponse(response)
  return schema.parse(response.data)
}
