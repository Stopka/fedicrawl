import { Provider } from './Provider'
import { Dictionary } from 'typescript-collections'
import { ProviderKeyAlreadyRegisteredError } from './ProviderKeyAlreadyRegisteredError'
import { ProviderKeyNotFoundError } from './ProviderKeyNotFoundError'
export type ProviderCallback = (key: string, provider: Provider) => void

const providers: Dictionary<string, Provider> = new Dictionary<string, Provider>()

const registerProvider = (provider: Provider): void => {
  const key = provider.getKey()
  if (providers.containsKey(key)) {
    throw new ProviderKeyAlreadyRegisteredError(key)
  }
  providers.setValue(key, provider)
  console.info('Added provider to registry', { key })
}

const getProviderByKey = (key: string): Provider => {
  const provider = providers.getValue(key)
  if (provider === undefined) {
    throw new ProviderKeyNotFoundError(key)
  }
  return provider
}

const getKeys = (): string[] => {
  return providers.keys()
}

const forEachProvider = (callback: ProviderCallback): void => {
  return providers.forEach(callback)
}

const containsKey = (key: string): boolean => {
  return providers.containsKey(key)
}

export interface ProviderRegistry {
  registerProvider: (provider: Provider) => void
  getProviderByKey: (key: string) => Provider
  forEachProvider: (callback: ProviderCallback) => void
  getKeys: () => string[]
  containsKey: (key: string) => boolean
}

export const providerRegistry: ProviderRegistry = {
  registerProvider,
  getProviderByKey,
  forEachProvider,
  getKeys,
  containsKey
}
