import axios from 'axios'
import { assertSuccessJsonResponse } from '../../assertSuccessJsonResponse'
import { z } from 'zod'

const schema = z.array(
  z.string()
)

export const retrievePeers = async (domain:string, page:number):Promise<string[]> => {
  if (page !== 0) {
    throw new Error('No more peer pages')
  }
  try {
    const response = await axios.get('https://' + domain + '/api/v1/instance/peers', {
      timeout: 10000
    })
    assertSuccessJsonResponse(response)
    return schema.parse(response.data)
  } catch (error) {
    throw new Error('Invalid response')
  }
}
