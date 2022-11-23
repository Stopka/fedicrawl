const CRAWLING_VERSION = 0

export default function getCrawlingVersion (): number {
  return CRAWLING_VERSION + parseInt(process.env.CRAWLING_VERSION ?? '0')
}
