import { lookup } from 'dns/promises'
import { updateNodeIps } from '../../Storage/Nodes/updateNodeIps'
import { ElasticClient } from '../../Storage/ElasticClient'
import Node from '../../Storage/Definitions/Node'

const refreshNodeIps = async (
  elastic: ElasticClient,
  node: Node
): Promise<Node> => {
  console.info('Looking up node ip addresses', {
    nodeDomain: node.domain
  })
  try {
    const addresses = await lookup(node.domain, { all: true })
    return await updateNodeIps(
      elastic,
      node,
      addresses.map((resolution) => resolution.address)
    )
  } catch (error) {
    console.warn('Could not lookup the domain', { node, error })
    return node
  }
}

export default refreshNodeIps
