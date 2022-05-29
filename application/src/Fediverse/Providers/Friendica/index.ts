import { Provider } from '../Provider'
import MastodonProvider from '../Mastodon'

/**
 * Pleroma implements Mastodon's api
 */
const FriendicaProvider: Provider = {
  getKey: () => 'friendica',
  getNodeProviders: MastodonProvider.getNodeProviders,
  getFeedProviders: MastodonProvider.getFeedProviders
}

export default FriendicaProvider
