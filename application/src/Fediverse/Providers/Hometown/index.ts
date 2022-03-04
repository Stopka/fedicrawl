import { Provider } from '../Provider'
import MastodonProvider from '../Mastodon'

const HometownProvider: Provider = {
  getKey: () => 'hometown',
  getNodeProviders: MastodonProvider.getNodeProviders,
  getFeedProviders: MastodonProvider.getFeedProviders
}

export default HometownProvider
