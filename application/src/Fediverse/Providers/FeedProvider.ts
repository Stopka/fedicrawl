import { FeedData } from './FeedData'

export interface FeedProvider {
    getKey: ()=>string
    retrieveFeeds: (domain:string, page:number)=> Promise<FeedData[]>
}
