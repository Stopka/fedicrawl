import isSeedDomain from '../Jobs/Seed/isSeedDomain.js'
import { getDefaultTimeoutMilliseconds } from './getDefaultTimeoutMilliseconds.js'
import { getSeedTimeoutMilliseconds } from './getSeedTimeoutMilliseconds.js'

export default function getTimeoutMilliseconds (domain: string): number {
  return isSeedDomain(domain)
    ? getSeedTimeoutMilliseconds()
    : getDefaultTimeoutMilliseconds()
}
