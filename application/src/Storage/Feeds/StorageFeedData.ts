import { FeedData } from '../../Fediverse/Providers/FeedData'

export default interface StorageFeedData extends FeedData {
  extractedTags: string[]
  extractedEmails: string[]
}
