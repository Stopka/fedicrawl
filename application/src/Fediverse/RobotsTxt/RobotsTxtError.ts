export class RobotsTxtError extends Error {
  public readonly url: string
  public constructor (url: URL) {
    super('Request was blocked by robots.txt')
    this.url = url.toString()
  }
}
