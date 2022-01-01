import { FeedData } from '../../Fediverse/Providers/FeedData'
import striptags from 'striptags'
import { Node } from '@prisma/client'

export default function (feedData: FeedData, node: Node):string {
  return striptags(
    feedData.displayName +
        ' ' + feedData.description +
        ' ' + feedData.fields.map(field => field.name).join(' ') +
        ' ' + feedData.fields.map(field => field.value).join(' ') +
      ' ' + feedData.name + '@' + node.domain +
      (feedData.parentFeed ? (' ' + feedData.parentFeed.name + '@' + feedData.parentFeed.hostDomain) : '')
  )
}
