export class NoMoreNodesError extends Error {
  public constructor (nodeType:string) {
    super(`No more nodes of type ${nodeType}`)
  }
}
