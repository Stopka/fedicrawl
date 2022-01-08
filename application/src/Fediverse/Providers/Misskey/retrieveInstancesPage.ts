import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'
import { getDefaultTimeoutMilliseconds } from '../../getDefaultTimeoutMilliseconds'

const limit = 100

const schema = z.array(
  z.object({
    host: z.string()
  })
)

export const retrieveInstancesPage = async (domain: string, page: number): Promise<string[]> => {
  try {
    const response = await axios.post('https://' + domain + '/api/federation/instances', {
      host: null,
      blocked: null,
      notResponding: null,
      suspended: null,
      federating: null,
      subscribing: null,
      publishing: null,
      limit: limit,
      offset: page * limit,
      sort: '+id'
    }, {
      timeout: getDefaultTimeoutMilliseconds()
    })
    assertSuccessJsonResponse(response)
    const responseData = schema.parse(response.data)
    if (responseData.length === 0) {
      throw new Error('No more instances')
    }
    return responseData.map(
      item => {
        return item.host
      }
    )
  } catch (error) {
    throw new Error('Invalid response: ' + error)
  }
}
