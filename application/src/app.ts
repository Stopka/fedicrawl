import providerRegistry from './Fediverse/Providers'
import { addNodeSeed } from './Jobs/Seed/addNodeSeed'
import { processNextNode } from './Jobs/processNextNode'
import assertNodeIndex from './Storage/Nodes/assertNodeIndex'
import assertFeedIndex from './Storage/Feeds/assertFeedIndex'
import elasticClient from './Storage/ElasticClient'
import deleteDomains from './Jobs/Seed/deleteBannedNodes'
import getBannedDomains from './Jobs/Seed/getBannedDomains'

const loop = async (): Promise<void> => {
  while (true) {
    try {
      await processNextNode(elasticClient, providerRegistry)
    } catch (err) {
      console.warn(err)
      const waitForJobMilliseconds = parseInt(process.env.WAIT_FOR_JOB_MINUTES ?? '60') * 60 * 1000
      console.info('Delaying next node process', { timeoutMilliseconds: waitForJobMilliseconds, timeoutDate: new Date(Date.now() + waitForJobMilliseconds), now: new Date() })
      setTimeout(loop, waitForJobMilliseconds)
      return
    }
  }
}

const app = async (): Promise<void> => {
  await assertNodeIndex(elasticClient)
  await assertFeedIndex(elasticClient)
  await deleteDomains(elasticClient, getBannedDomains())
  const seedDomains = (process.env.SEED_NODE_DOMAIN ?? 'mastodon.social').split(',')
  await addNodeSeed(elasticClient, seedDomains)
  setTimeout(loop)
}

app()
