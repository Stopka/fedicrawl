import { FieldData } from './FieldData'

export interface FeedData {
    name:string,
    displayName:string,
    description:string,
    followersCount: number,
    followingCount:number,
    statusesCount:number,
    bot:boolean,
    url: string,
    avatar:string|null,
    locked:boolean,
    lastStatusAt:Date|null,
    createdAt:Date
    fields: FieldData[],
    type: 'account'|'channel'
    parentFeed: {
        name:string
        hostDomain:string
    }|null
}
