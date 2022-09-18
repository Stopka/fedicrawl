import { UnexpectedResponseError } from './UnexpectedResponseError'

export class UnexpectedContentTypeError extends UnexpectedResponseError {
  private readonly _expectedContentType: string
  private readonly _actualContentType: string

  public constructor (actualContentType: string, expectedContentType: string) {
    super(
      `Expected content type '${expectedContentType}' but got '${actualContentType}'`
    )
    this._expectedContentType = expectedContentType
    this._actualContentType = actualContentType
  }

  get expectedContentType (): string {
    return this._expectedContentType
  }

  get actualContentType (): string {
    return this._actualContentType
  }
}
