export default function getBannedDomains (): string[] {
  const domains = process.env.BANNED_DOMAINS ?? ''
  if (domains === '') {
    return []
  }
  return domains.split(',').map((domain) => domain.toLowerCase())
}
