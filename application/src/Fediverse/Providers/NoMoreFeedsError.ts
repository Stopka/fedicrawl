export class NoMoreFeedsError extends Error {
  public constructor (feedType:string) {
    super(`No more feeds of type ${feedType}`)
  }
}
