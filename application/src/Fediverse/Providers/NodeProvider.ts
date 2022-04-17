import { NodeProviderMethod } from './NodeProviderMethod'

export interface NodeProvider {
    getKey:()=>string,
    retrieveNodes: NodeProviderMethod
}
