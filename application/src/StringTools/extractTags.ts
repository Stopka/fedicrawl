export const extractTags = (text: string): string[] => {
  const matches = text.match(/#[a-z0-9_]+/gi)
  if (matches === null) {
    return []
  }
  return matches.map((hashtag) => hashtag.substring(1).toLowerCase())
}
