import getCrawlingVersion from '../../Fediverse/getCrawlingVersion.js'
import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
export const createMissingNodes = async (
  elastic: ElasticClient,
  domains: string[],
  discoveredByDomain: string | undefined,
  crawlingDepth: number
): Promise<number> => {
  const response = await elastic.bulk({
    index: nodeIndex,
    body: domains.flatMap((domain) => [
      {
        create: { _id: domain }
      },
      {
        domain,
        discoveredByDomain,
        crawlingDepth,
        crawlingVersion: getCrawlingVersion(),
        foundAt: new Date().getTime()
      }
    ])
  })
  const createdCount = response.items.filter(
    (item) => item.create?.status === 201
  ).length
  console.warn('Created new nodes', {
    requestedCount: domains.length,
    createdCount,
    errors: response.items
      .filter((item) => item.create?.status !== 201)
      .map((item) => item.create?.error?.reason)
  })
  return createdCount
}
