import { useCallback } from "react"

const TweetContainer = ({ tweet }) => {
  const getTweetAgeString = useCallback(() => {
    const tweetAge = Math.floor((Date.now() - Date.parse(tweet.created_at)) / 1000)
    if (tweetAge < 60) return `${tweetAge} seconds ago`
    if (tweetAge < 3600) return `${tweetAge / 60} minutes ago`
    if (tweetAge < 3600 * 24) return `${tweetAge / (60 * 24)} hours ago`
    return "really old tweet"
  }, [])
  return (
    <div className="relative w-full h-48 p-4 bg-secondary1 rounded-lg mb-10">
      <div className="text-textStandard">
        <span className="font-medium">{tweet.user.name}</span>
        <span className="ml-1 text-textDisabled">@{tweet.user.screen_name}</span>
        <span className="ml-1 text-textDisabled">{getTweetAgeString()}</span>
      </div>
      <div className="text-textStandard font-gilroy font-medium text-base">{tweet.text}</div>
      <div className="absolute opacity-70 px-3 h-8 rounded-lg bg-secondary2 bottom-3 right-3 flex flex-row items-center">
        <div className="text-textStandard flex flex-row">
          {tweet.retweet_count}
          <span className="material-icons ml-1 flex flex-row">favorite_border</span>
        </div>
        <div className="ml-2 text-textStandard flex flex-row">
          {tweet.favorite_count}
          <span>
            <svg className=" ml-1" width="24" height="24" viewBox="0 0 24 24">
              <g>
                <path
                  fill="white"
                  d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TweetContainer
