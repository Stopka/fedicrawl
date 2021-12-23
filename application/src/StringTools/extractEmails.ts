export const extractEmails = (text:string):string[] => {
  return (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || [])
    .map(email => email.toLowerCase()) || []
}
