import { providerRegistry } from './ProviderRegistry'
import MastodonProvider from './Mastodon'
import PeertubeProvider from './Peertube'
import PleromaProvider from './Pleroma'
import MisskeyProvider from './Misskey'
import EckoProvider from './Ecko'
import HometownProvider from './Hometown'

providerRegistry.registerProvider(MastodonProvider)
providerRegistry.registerProvider(HometownProvider)
providerRegistry.registerProvider(EckoProvider)
providerRegistry.registerProvider(PeertubeProvider)
providerRegistry.registerProvider(PleromaProvider)
providerRegistry.registerProvider(MisskeyProvider)

export default providerRegistry
