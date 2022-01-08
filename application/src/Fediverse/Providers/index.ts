import { providerRegistry } from './ProviderRegistry'
import MastodonProvider from './Mastodon'
import PeertubeProvider from './Peertube'
import PleromaProvider from './Pleroma'
import MisskeyProvider from './Misskey'

providerRegistry.registerProvider(MastodonProvider)
providerRegistry.registerProvider(PeertubeProvider)
providerRegistry.registerProvider(PleromaProvider)
providerRegistry.registerProvider(MisskeyProvider)

export default providerRegistry
