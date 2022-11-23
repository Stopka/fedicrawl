import PromiseFactory from './PromiseFactory.js'

export default async function batchPromises<TResult> (
  promiseFactories: Array<PromiseFactory<TResult>>,
  batchSize: number
): Promise<TResult[]> {
  const results: TResult[] = []

  do {
    const batch = promiseFactories.splice(0, batchSize)
    results.push(
      ...await Promise.all(
        batch.map(async promiseFactory => await promiseFactory())
      )
    )
  } while (promiseFactories.length > 0)
  return results
}
