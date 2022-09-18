import { FieldData } from './FieldData'

export interface FeedData {
  name: string
  displayName: string
  description: string
  followersCount: number
  followingCount: number
  statusesCount?: number
  bot?: boolean
  url: string
  avatar?: string
  locked: boolean
  lastStatusAt?: Date
  createdAt: Date
  fields: FieldData[]
  type: 'account' | 'channel'
  parentFeed?: {
    name: string
    hostDomain: string
  }
}
