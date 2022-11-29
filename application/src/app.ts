import providerRegistry from './Fediverse/Providers'
import { addNodeSeed } from './Jobs/Seed/addNodeSeed'
import { processNextNode } from './Jobs/processNextNode'
import getSeedDomains from './Jobs/Seed/getSeedDomains.js'
import assertNodeIndex from './Storage/Nodes/assertNodeIndex'
import assertFeedIndex from './Storage/Feeds/assertFeedIndex'
import elasticClient from './Storage/ElasticClient'
import deleteDomains from './Jobs/Seed/deleteBannedNodes'
import getBannedDomains from './Jobs/Seed/getBannedDomains'

const timeout = async (ms: number): Promise<void> => {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

const loop = async (): Promise<void> => {
  // noinspection InfiniteLoopJS
  while (true) {
    try {
      await processNextNode(elasticClient, providerRegistry)
    } catch (err) {
      console.warn(err)
      const waitForJobMilliseconds =
        parseInt(process.env.WAIT_FOR_JOB_MINUTES ?? '60') * 60 * 1000
      console.info('Delaying next node process', {
        timeoutMilliseconds: waitForJobMilliseconds,
        timeoutDate: new Date(Date.now() + waitForJobMilliseconds),
        now: new Date()
      })
      await timeout(waitForJobMilliseconds)
    }
  }
}

const app = async (): Promise<void> => {
  await assertNodeIndex(elasticClient)
  await assertFeedIndex(elasticClient)
  await deleteDomains(elasticClient, getBannedDomains())
  await addNodeSeed(elasticClient, getSeedDomains())
  await loop()
}

app()
  .then(() => console.info('App finished'))
  .catch((error) => console.error('App was interrupted', { error }))
