export const parseDescription = (description: string | null): string => {
  if (typeof description !== 'string') {
    return ''
  }
  return description
    .split('\n\n')
    .map((paragraph) => {
      paragraph = paragraph.replace('\n', '</br>\n')
      return `<p>${paragraph}</p>`
    })
    .join('\n')
}
