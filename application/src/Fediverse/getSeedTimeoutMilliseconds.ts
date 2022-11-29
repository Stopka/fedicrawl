import { getDefaultTimeoutMilliseconds } from './getDefaultTimeoutMilliseconds.js'

export const getSeedTimeoutMilliseconds = (): number => {
  return parseInt(process.env.SEED_TIMEOUT_MILLISECONDS ?? getDefaultTimeoutMilliseconds().toString())
}
