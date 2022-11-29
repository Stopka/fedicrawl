import getSeedDomains from './getSeedDomains.js'

export default function isSeedDomain (domain: string): boolean {
  return getSeedDomains().includes(domain)
}
