import { FeedProviderMethod } from './FeedProviderMethod'

export interface FeedProvider {
  getKey: () => string
  retrieveFeeds: FeedProviderMethod
}
