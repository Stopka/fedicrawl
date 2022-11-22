export class RobotsTxtError extends Error {
  public readonly url
  public constructor (url: string) {
    super('Request was blocked by robots.txt')
    this.url = url
  }
}
