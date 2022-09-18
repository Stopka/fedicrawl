import Field from './Field'

interface Feed {
  domain: string
  foundAt: number
  refreshedAt?: number
  name: string
  fullName: string
  displayName: string
  description: string
  strippedDescription?: string
  followersCount?: number
  followingCount?: number
  statusesCount?: number
  lastStatusAt?: number
  createdAt?: number
  bot?: boolean
  locked: boolean
  url: string
  avatar?: string
  type: 'account' | 'channel'
  parentFeedName?: string
  parentFeedDomain?: string
  fields: Field[]
  extractedEmails: string[]
  extractedTags: string[]
}

export default Feed
