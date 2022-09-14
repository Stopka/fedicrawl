import { retrieveDomainNodeInfo } from '../../Fediverse/NodeInfo/retrieveDomainNodeInfo'
import { updateNodeInfo } from '../../Storage/Nodes/updateNodeInfo'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const refreshNodeInfo = async (elastic: ElasticClient, node:Node):Promise<Node> => {
  console.info('Updating info of node', { nodeDomain: node.domain })
  try {
    const nodeInfo = await retrieveDomainNodeInfo(node.domain)
    return await updateNodeInfo(elastic, node, nodeInfo)
  } catch (error) {
    console.warn('Failed to update node info: ' + error)
    return node
  }
}
