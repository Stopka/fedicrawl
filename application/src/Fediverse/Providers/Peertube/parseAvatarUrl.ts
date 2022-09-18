import { Avatar } from './Avatar'

export const parseAvatarUrl = (
  data: Avatar,
  domain: string
): string | undefined => {
  if (data === null || data === undefined) {
    return undefined
  }
  return `https://${domain}${data.path}`
}
