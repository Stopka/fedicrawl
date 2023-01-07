import { providerRegistry } from './ProviderRegistry'
import MastodonProvider from './Mastodon'
import PeertubeProvider from './Peertube'
import PleromaProvider from './Pleroma'
import MisskeyProvider from './Misskey'
import EckoProvider from './Ecko'
import HometownProvider from './Hometown'
import FriendicaProvider from './Friendica'
import AkkomaProvider from './Akkoma'
import CalckeyProvider from './Calckey'
import FoundkeyProvider from './Foundkey'
import MeisskeyProvider from './Meisskey'

providerRegistry.registerProvider(MastodonProvider)
providerRegistry.registerProvider(HometownProvider)
providerRegistry.registerProvider(EckoProvider)

providerRegistry.registerProvider(PeertubeProvider)

providerRegistry.registerProvider(PleromaProvider)
providerRegistry.registerProvider(AkkomaProvider)

providerRegistry.registerProvider(MisskeyProvider)
providerRegistry.registerProvider(CalckeyProvider)
providerRegistry.registerProvider(FoundkeyProvider)
providerRegistry.registerProvider(MeisskeyProvider)

providerRegistry.registerProvider(FriendicaProvider)

export default providerRegistry
