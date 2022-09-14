import { Avatar } from './Avatar'

export const parseAvatarUrl = (data:Avatar, domain:string):string|undefined => {
  if (data === null) {
    return undefined
  }
  return `https://${domain}${data.path}`
}
