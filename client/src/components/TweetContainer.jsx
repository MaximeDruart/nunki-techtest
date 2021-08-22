const TweetContainer = ({ tweet }) => {
  return (
    <div className="w-full h-48 p-4 bg-secondary1 rounded-lg mb-10">
      <div className="text-textStandard font-gilroy">{tweet.text}</div>
    </div>
  )
}

export default TweetContainer
