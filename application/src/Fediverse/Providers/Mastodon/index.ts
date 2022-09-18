import { Provider } from '../Provider'
import { retrievePeers } from './retrievePeers'
import { retrieveLocalPublicUsersPage } from './retrieveLocalPublicUsersPage'
import { NodeProvider } from '../NodeProvider'
import { FeedProvider } from '../FeedProvider'

const MastodonProvider: Provider = {
  getKey: () => 'mastodon',
  getNodeProviders: (): NodeProvider[] => [
    {
      getKey: () => 'peers',
      retrieveNodes: retrievePeers
    }
  ],
  getFeedProviders: (): FeedProvider[] => [
    {
      getKey: () => 'users',
      retrieveFeeds: retrieveLocalPublicUsersPage
    }
  ]
}

export default MastodonProvider
