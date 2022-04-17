import { Provider } from '../Provider'
import MastodonProvider from '../Mastodon'

/**
 * Hometown is Mastodon's fork
 */
const HometownProvider: Provider = {
  getKey: () => 'hometown',
  getNodeProviders: MastodonProvider.getNodeProviders,
  getFeedProviders: MastodonProvider.getFeedProviders
}

export default HometownProvider
