export const getTweetAgeString = (tweetDate) => {
  const tweetAge = Math.floor((Date.now() - Date.parse(tweetDate)) / 1000)
  if (tweetAge < 60) return `${Math.floor(tweetAge)} second${Math.floor(tweetAge) > 1 ? "s" : ""} ago`
  if (tweetAge < 60 * 60) return `${Math.floor(tweetAge / 60)} minute${Math.floor(tweetAge / 60) > 1 ? "s" : ""} ago`
  if (tweetAge < 60 * 60 * 24)
    return `${Math.floor(tweetAge / (60 * 60))} hour${Math.floor(tweetAge / (60 * 60)) > 1 ? "s" : ""} ago`
  return `${Math.floor(tweetAge / (60 * 60 * 24))} day${Math.floor(tweetAge / (60 * 60 * 24)) > 1 ? "s" : ""} ago`
}

// https://stackoverflow.com/questions/5341168/best-way-to-make-links-clickable-in-block-of-text
// twitter sends the body of the tweet as text but there are links in it (twitter.co/lorem) this regex wraps the urls in a tags
export const addLinksToUrlsInString = (text) => {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
  let text1 = text.replace(exp, "<a class='text-primary5' href='$1'>$1</a>")
  var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  return text1.replace(exp2, '$1<a class="text-primary5" target="_blank" href="http://$2">$2</a>')
  // return str.replace(new RegExp("!(((f|ht)tp(s)?://)[-a-zA-Zа-яА-Я()0-9@:%_+.~#?&;//=]+)!i"), '<a href="$1">$1</a>')
}
