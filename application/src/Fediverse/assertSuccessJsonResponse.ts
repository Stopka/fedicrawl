import { AxiosResponse } from 'axios'
import { UnexpectedResponseStatusError } from './UnexpectedResponseStatusError'
import { UnexpectedContentTypeError } from './UnexpectedContentTypeError'

export const assertSuccessJsonResponse = (
  response: AxiosResponse<unknown>
): void => {
  const expectedStatus = 200
  const actualStatus = response.status
  if (actualStatus !== expectedStatus) {
    throw new UnexpectedResponseStatusError(expectedStatus, actualStatus)
  }
  const expectedContentType = 'application/json'
  const actualContentType = String(response.headers['content-type'])
  if (!actualContentType.startsWith(expectedContentType)) {
    throw new UnexpectedContentTypeError(actualContentType, expectedContentType)
  }
}
