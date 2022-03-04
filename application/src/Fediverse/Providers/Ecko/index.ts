import { Provider } from '../Provider'
import MastodonProvider from '../Mastodon'

const EckoProvider: Provider = {
  getKey: () => 'ecko',
  getNodeProviders: MastodonProvider.getNodeProviders,
  getFeedProviders: MastodonProvider.getFeedProviders
}

export default EckoProvider
