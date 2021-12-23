import { providerRegistry } from './ProviderRegistry'
import MastodonProvider from './Mastodon'
import PeertubeProvider from './Peertube'

providerRegistry.registerProvider(MastodonProvider)
providerRegistry.registerProvider(PeertubeProvider)

export default providerRegistry
