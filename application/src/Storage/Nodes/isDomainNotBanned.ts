import getBannedDomains from '../../Jobs/Seed/getBannedDomains'

export default function isDomainNotBanned (domain): boolean {
  return (
    getBannedDomains().filter(
      (banned) => domain.match(new RegExp('(.*\\.)?' + banned, 'gi')) !== null
    ).length === 0
  )
}
