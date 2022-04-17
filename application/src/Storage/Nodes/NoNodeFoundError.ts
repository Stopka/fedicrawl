export class NoNodeFoundError extends Error {
  public constructor () {
    super('No node found')
  }
}
