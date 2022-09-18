export class ProviderKeyNotFoundError extends Error {
  private readonly _key: string

  public constructor (key: string) {
    super(`Provider with the key ${key} is not registered`)
    this._key = key
  }

  public get key (): string {
    return this._key
  }
}
