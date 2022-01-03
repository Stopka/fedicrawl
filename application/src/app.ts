import providerRegistry from './Fediverse/Providers'
import prismaClient from './Storage/PrismaClient'
import { addNodeSeed } from './Jobs/Seed/addNodeSeed'
import { processNextNode } from './Jobs/processNextNode'

const loop = async (): Promise<void> => {
  while (true) {
    try {
      await processNextNode(prismaClient, providerRegistry)
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
  const seedDomain = process.env.SEED_NODE_DOMAIN ?? 'mastodon.social'
  await addNodeSeed(prismaClient, seedDomain)
  setTimeout(loop)
}

app()
