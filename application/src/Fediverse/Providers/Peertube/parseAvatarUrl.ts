import { Avatar } from './Avatar'

export const parseAvatarUrl = (data:Avatar, domain:string):string|null => {
  if (data === null) {
    return null
  }
  return `https://${domain}${data.path}`
}
