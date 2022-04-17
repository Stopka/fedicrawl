export class ProviderKeyAlreadyRegisteredError extends Error {
  private readonly _key:string

  public constructor (key:string) {
    super(`Provider with the key ${key} is already registered`)
    this._key = key
  }

  public get key (): string {
    return this._key
  }
}
