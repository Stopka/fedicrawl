import MisskeyProvider from "../Misskey";
import { Provider } from '../Provider'

/**
 * Meisskey is Misskey's fork
 */
const MeisskeyProvider: Provider = {
  getKey: () => 'meisskey',
  getNodeProviders: MisskeyProvider.getNodeProviders,
  getFeedProviders: MisskeyProvider.getFeedProviders
}

export default MeisskeyProvider
