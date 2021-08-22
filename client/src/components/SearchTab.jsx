import { useMemo } from "react"
import TweetContainer from "./TweetContainer"

const SearchTab = ({ keyword, tweets }) => {
  const mappedTweets = useMemo(() => tweets.map((tweet, i) => <TweetContainer key={i} tweet={tweet} />), [tweets])
  return (
    <div>
      <div>{mappedTweets}</div>
    </div>
  )
}

export default SearchTab
