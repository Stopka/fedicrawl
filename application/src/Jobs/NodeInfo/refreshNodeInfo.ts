import { retrieveDomainNodeInfo } from '../../Fediverse/NodeInfo/retrieveDomainNodeInfo'
import RobotsTxt from '../../Fediverse/RobotsTxt/RobotsTxt.js'
import { updateNodeInfo } from '../../Storage/Nodes/updateNodeInfo'
import Node from '../../Storage/Definitions/Node'
import { ElasticClient } from '../../Storage/ElasticClient'

export const refreshNodeInfo = async (
  elastic: ElasticClient,
  node: Node,
  robotsTxt: RobotsTxt
): Promise<Node> => {
  console.info('Updating info of node', { nodeDomain: node.domain })
  try {
    const nodeInfo = await retrieveDomainNodeInfo(node.domain, robotsTxt)
    return await updateNodeInfo(elastic, node, nodeInfo)
  } catch (error) {
    console.warn('Failed to update node info, unsetting node', error)
    return await updateNodeInfo(elastic, node, {
      software: {
        name: null,
        version: null
      }
    })
  }
}
