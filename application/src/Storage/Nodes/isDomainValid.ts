export default function isDomainValid (domain: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(`https://${domain}/`)
  } catch (e) {
    console.info('Domain is invalid', { domain })
    return false
  }
  return true
}
