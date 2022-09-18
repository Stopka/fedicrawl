import { NodeProvider } from './NodeProvider'
import { FeedProvider } from './FeedProvider'

export interface Provider {
  getKey: () => string

  getNodeProviders: () => NodeProvider[]

  getFeedProviders: () => FeedProvider[]
}
