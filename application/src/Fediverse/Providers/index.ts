import { providerRegistry } from './ProviderRegistry'
import MastodonProvider from './Mastodon'
import PeertubeProvider from './Peertube'
import PleromaProvider from './Pleroma'

providerRegistry.registerProvider(MastodonProvider)
providerRegistry.registerProvider(PeertubeProvider)
providerRegistry.registerProvider(PleromaProvider)

export default providerRegistry
