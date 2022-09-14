import Feed from '../Definitions/Feed'
import { ElasticClient } from '../ElasticClient'
import feedIndex from '../Definitions/feedIndex'

const getFeed = async (elastic: ElasticClient, feedFullName:string):Promise<Feed> => {
  const result = await elastic.get<Feed>({
    index: feedIndex,
    id: feedFullName
  })
  return result._source
}

export default getFeed
