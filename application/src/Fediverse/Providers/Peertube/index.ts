import { Provider } from '../Provider'
import { retrieveVideoChannels } from './retrieveVideoChannels'
import { retrieveAccounts } from './retrieveAccounts'
import { NodeProvider } from '../NodeProvider'
import { FeedProvider } from '../FeedProvider'
import { retrieveFollowers } from './retrieveFollowers'

const PeertubeProvider: Provider = {
  getKey: () => 'peertube',
  getNodeProviders: ():NodeProvider[] => [{
    getKey: () => 'followers',
    retrieveNodes: retrieveFollowers
  }],
  getFeedProviders: ():FeedProvider[] => [{
    getKey: () => 'accounts',
    retrieveFeeds: retrieveAccounts
  }, {
    getKey: () => 'video-channels',
    retrieveFeeds: retrieveVideoChannels
  }]
}
export default PeertubeProvider
