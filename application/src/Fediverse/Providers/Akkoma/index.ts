import PleromaProvider from "../Pleroma";
import { Provider } from '../Provider'

/**
 * Akkoma is Pleroma's fork
 */
const AkkomaProvider: Provider = {
  getKey: () => 'akkoma',
  getNodeProviders: PleromaProvider.getNodeProviders,
  getFeedProviders: PleromaProvider.getFeedProviders
}

export default AkkomaProvider
