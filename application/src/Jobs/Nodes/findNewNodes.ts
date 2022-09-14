import { NodeProvider } from '../../Fediverse/Providers/NodeProvider'
import { findNewNodesOnPage } from './findNewNodesOnPage'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const findNewNodes = async (elastic: ElasticClient, provider:NodeProvider, node:Node):Promise<void> => {
  try {
    for (let page = 0; true; page++) {
      console.info('Retrieve node page', { domain: node.domain, provider: provider.getKey() })
      await findNewNodesOnPage(elastic, provider, node, page)
    }
  } catch (e) {
    console.info('Node search finished: ' + e, { domain: node.domain, provider: provider.getKey() })
  }
}
