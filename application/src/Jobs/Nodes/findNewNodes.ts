import { Node, PrismaClient } from '@prisma/client'
import { NodeProvider } from '../../Fediverse/Providers/NodeProvider'
import { findNewNodesOnPage } from './findNewNodesOnPage'

export const findNewNodes = async (prisma: PrismaClient, provider:NodeProvider, node:Node):Promise<void> => {
  try {
    for (let page = 0; true; page++) {
      console.info('Retrieve node page', { domain: node.domain, provider: provider.getKey() })
      await findNewNodesOnPage(prisma, provider, node, page)
    }
  } catch (e) {
    console.info('Node search finished: ' + e, { domain: node.domain, provider: provider.getKey() })
  }
}
