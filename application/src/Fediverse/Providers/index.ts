import { providerRegistry } from './ProviderRegistry'
import MastodonProvider from './Mastodon'
import PeertubeProvider from './Peertube'
import PleromaProvider from './Pleroma'
import MisskeyProvider from './Misskey'
import EckoProvider from './Ecko'
import HometownProvider from './Hometown'
import FriendicaProvider from './Friendica'

providerRegistry.registerProvider(MastodonProvider)
providerRegistry.registerProvider(HometownProvider)
providerRegistry.registerProvider(EckoProvider)
providerRegistry.registerProvider(PeertubeProvider)
providerRegistry.registerProvider(PleromaProvider)
providerRegistry.registerProvider(MisskeyProvider)
providerRegistry.registerProvider(FriendicaProvider)

export default providerRegistry
