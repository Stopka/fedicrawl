import MisskeyProvider from "../Misskey";
import { Provider } from '../Provider'

/**
 * Calckey is Misskey's fork
 */
const CalckeyProvider: Provider = {
  getKey: () => 'calckey',
  getNodeProviders: MisskeyProvider.getNodeProviders,
  getFeedProviders: MisskeyProvider.getFeedProviders
}

export default CalckeyProvider
