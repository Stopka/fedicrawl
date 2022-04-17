import { Provider } from '../Provider'
import MastodonProvider from '../Mastodon'

/**
 * Ecko is Mastodon's fork
 */
const EckoProvider: Provider = {
  getKey: () => 'ecko',
  getNodeProviders: MastodonProvider.getNodeProviders,
  getFeedProviders: MastodonProvider.getFeedProviders
}

export default EckoProvider
