import { Provider } from '../Provider'
import MastodonProvider from '../Mastodon'

/**
 * Pleroma implements Mastodon's api
 */
const PleromaProvider: Provider = {
  getKey: () => 'pleroma',
  getNodeProviders: MastodonProvider.getNodeProviders,
  getFeedProviders: MastodonProvider.getFeedProviders
}

export default PleromaProvider
