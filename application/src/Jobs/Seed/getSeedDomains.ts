export default function getSeedDomains (): string[] {
  return (process.env.SEED_NODE_DOMAIN ?? 'mastodon.social,mastodon.online').split(
    ','
  )
}
