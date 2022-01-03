export const getDefaultTimeoutMilliseconds = () :number => {
  return parseInt(process.env.DEFAULT_TIMEOUT_MILLISECONDS ?? '10000')
}
