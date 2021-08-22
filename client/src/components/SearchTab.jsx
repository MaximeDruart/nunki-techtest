import { useMemo } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import TweetContainer from "./TweetContainer"

const SearchTab = ({ keyword, tweets }) => {
  const mappedTweets = useMemo(() => tweets.map((tweet, i) => <TweetContainer key={i} tweet={tweet} />), [tweets])
  return <PerfectScrollbar className="pr-4">{mappedTweets}</PerfectScrollbar>
}

export default SearchTab
