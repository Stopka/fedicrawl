export const extractTags = (text:string):string[] => {
  return (text.match(/#[a-z0-9_]+/gi) || [])
    .map(hashtag => hashtag.substring(1).toLowerCase()) || []
}
