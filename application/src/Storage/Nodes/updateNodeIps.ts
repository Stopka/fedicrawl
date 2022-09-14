import Node from '../Definitions/Node'
import { ElasticClient } from '../ElasticClient'
import nodeIndex from '../Definitions/nodeIndex'
import getNode from './getNode'

export const updateNodeIps = async (elastic:ElasticClient, node: Node, ips:string[]):Promise<Node> => {
  await elastic.update<Node>({
    index: nodeIndex,
    id: node.domain,
    doc: {
      serverIps: ips
    }
  })
  const resultNode = await getNode(elastic, node.domain)
  console.info('Updated node ips', { resultNode })
  return resultNode
}
