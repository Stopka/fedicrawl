export default function assertDefined<T> (
  value: T | undefined | null,
  errorMessage: string
): T {
  if (value === null || value === undefined) {
    throw new Error(errorMessage)
  }
  return value
}
