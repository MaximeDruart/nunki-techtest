export const getTweetAgeString = (tweetDate) => {
  const tweetAge = Math.floor((Date.now() - Date.parse(tweetDate)) / 1000)
  if (tweetAge < 60) return `${Math.floor(tweetAge)} seconds ago`
  if (tweetAge < 3600) return `${Math.floor(tweetAge / 60)} minutes ago`
  if (tweetAge < 3600 * 24) return `${Math.floor(tweetAge / (60 * 24))} hours ago`
  return "really old tweet"
}
