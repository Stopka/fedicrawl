export const extractEmails = (text: string): string[] => {
  const matches = text.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  )
  if (matches === null) {
    return []
  }
  return matches.map((email) => email.toLowerCase())
}
