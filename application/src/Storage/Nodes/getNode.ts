import { ElasticClient } from '../ElasticClient'
import Node from '../Definitions/Node'
import nodeIndex from '../Definitions/nodeIndex'

const getNode = async (elastic:ElasticClient, domain:string):Promise<Node> => {
  const result = await elastic.get<Node>({
    index: nodeIndex,
    id: domain
  })
  return result._source
}

export default getNode
