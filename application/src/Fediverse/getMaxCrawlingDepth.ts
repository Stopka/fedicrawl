export default function getMaxCrawlingDepth (): number | undefined {
  if (process.env.MAX_CRAWLING_DEPTH === undefined || process.env.MAX_CRAWLING_DEPTH === '') {
    return undefined
  }
  const depth = parseInt(process.env.MAX_CRAWLING_DEPTH)
  if (depth >= 0) {
    return depth
  }
  return undefined
}
