import { AxiosResponse } from 'axios'

export const assertSuccessJsonResponse = (response:AxiosResponse<unknown>):void => {
  if (response.status !== 200) {
    throw new Error('Unexpected response ' + response.status)
  }
  if (!response.headers['content-type'].startsWith('application/json')) {
    throw new Error('Unexpected content-type ' + response.headers['content-type'])
  }
}
