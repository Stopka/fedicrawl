import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { getDefaultTimeoutMilliseconds } from '../../getDefaultTimeoutMilliseconds'
import { NodeProviderMethod } from '../NodeProviderMethod'
import { NoMoreNodesError } from '../NoMoreNodesError'

const schema = z.array(
  z.string()
)

export const retrievePeers:NodeProviderMethod = async (domain, page) => {
  if (page !== 0) {
    throw new NoMoreNodesError('peer')
  }
  const response = await axios.get('https://' + domain + '/api/v1/instance/peers', {
    timeout: getDefaultTimeoutMilliseconds()
  })
  assertSuccessJsonResponse(response)
  return schema.parse(response.data)
}
