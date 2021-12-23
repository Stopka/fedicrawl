import { FeedData } from '../../Fediverse/Providers/FeedData'
import striptags from 'striptags'

export default function (feedData: FeedData):string {
  return striptags(
    feedData.description +
        ' ' + feedData.fields.map(field => field.name).join(' ') +
        ' ' + feedData.fields.map(field => field.value).join(' ')
  )
}
