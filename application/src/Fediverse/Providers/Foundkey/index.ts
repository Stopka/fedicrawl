import MisskeyProvider from "../Misskey";
import { Provider } from '../Provider'

/**
 * Foundkey is Misskey's fork
 */
const FoundkeyProvider: Provider = {
  getKey: () => 'foundkey',
  getNodeProviders: MisskeyProvider.getNodeProviders,
  getFeedProviders: MisskeyProvider.getFeedProviders
}

export default FoundkeyProvider
