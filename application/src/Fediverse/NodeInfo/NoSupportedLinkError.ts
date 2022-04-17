export class NoSupportedLinkError extends Error {
  public constructor (domain:string) {
    super(`No supported link node info link for ${domain}`)
  }
}
