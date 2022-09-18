import { UnexpectedResponseError } from './UnexpectedResponseError'

export class UnexpectedResponseStatusError extends UnexpectedResponseError {
  private readonly _expectedStatusCode: number
  private readonly _actualStatusCode: number

  public constructor (expectedStatusCode: number, actualStatusCode: number) {
    super(
      `Expected response code ${expectedStatusCode} but got ${actualStatusCode}`
    )
    this._actualStatusCode = actualStatusCode
    this._expectedStatusCode = expectedStatusCode
  }

  get expectedStatusCode (): number {
    return this._expectedStatusCode
  }

  get actualStatusCode (): number {
    return this._actualStatusCode
  }
}
