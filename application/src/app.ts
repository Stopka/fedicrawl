import providerRegistry from './Fediverse/Providers'
import prismaClient from './Storage/PrismaClient'
import { addNodeSeed } from './Jobs/Seed/addNodeSeed'
import { processNextNode } from './Jobs/processNextNode'

const loop = async ():Promise<void> => {
  while (true) {
    try {
      await processNextNode(prismaClient, providerRegistry)
    } catch (err) {
      setTimeout(loop, 1000 * 60 * 60)
    }
  }
}

const app = async ():Promise<void> => {
  const seedDomain = process.env.SEED_NODE_DOMAIN ?? 'mastodon.social'
  await addNodeSeed(prismaClient, seedDomain)
  setTimeout(loop)
}

app()
