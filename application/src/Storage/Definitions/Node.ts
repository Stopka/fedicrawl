import Geo from './Geo'

interface Node {
  name?: string
  strippedName?: string
  foundAt: number
  refreshAttemptedAt?: number
  refreshedAt?: number
  openRegistrations?: boolean
  domain: string
  serverIps?: string[]
  geoip?: Geo[]
  softwareName?: string
  softwareVersion?: string
  standardizedSoftwareVersion?: string
  halfYearActiveUserCount?: number
  monthActiveUserCount?: number
  statusesCount?: number
  totalUserCount?: number
  discoveredByDomain?: string
  accountFeedCount?: number
  channelFeedCount?: number
}

export default Node
