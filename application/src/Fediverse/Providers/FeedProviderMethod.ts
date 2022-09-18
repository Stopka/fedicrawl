import { FeedData } from './FeedData'

export type FeedProviderMethod = (
  domain: string,
  page: number
) => Promise<FeedData[]>
