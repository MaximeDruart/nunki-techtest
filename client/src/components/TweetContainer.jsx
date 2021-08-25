import { motion } from "framer-motion"
import React, { useCallback, useMemo } from "react"
import useStore from "../searchResultsStore"
import { addLinksToUrlsInString, getTweetAgeString } from "../assets/utils/functions"

const TweetContainer = (props) => {
  const setUserModal = useStore((state) => state.setUserModal)
  const openUserModal = useCallback(() => setUserModal({ isOpen: true, userDetail: tweet.user }), [setUserModal])
  const setTweetModal = useStore((state) => state.setTweetModal)
  const openTweetModal = useCallback(
    () => setTweetModal({ isOpen: true, tweets: props.tweets, tweetIndex: props.index }),
    [setTweetModal]
  )

  const tweet = useMemo(() => props.tweet, [props])
  return (
    <motion.div {...props} className="relative w-full p-4 pb-10 bg-secondary1 rounded-lg mb-5 flex flex-col">
      <div className="flex flex-row w-full">
        <div className="rounded-lg h-14 w-14 overflow-hidden flex-shrink-0">
          <img className="object-cover w-full h-full" src={tweet.user.profile_image_url} alt="Tweet user" />
        </div>
        <div className="ml-4">
          <div className="text-textStandard">
            <button onClick={openUserModal} className="text-textDisabled">
              <span className="font-bold text-textStandard">{tweet.user.name}</span>
              <span className="ml-1 text-textDisabled">@{tweet.user.screen_name}</span>
            </button>
            <span> -</span>
            <span className="ml-1 text-textDisabled">{getTweetAgeString()}</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: addLinksToUrlsInString(tweet.text) }}
            className="text-textStandard font-gilroy font-medium text-base mb-2 pr-12"
          ></div>
        </div>
      </div>
      {tweet.entities.media && (
        <div className="mt-4 flex flex-row justify-between h-52">
          {tweet.entities.media.map((media) => (
            <div key={media.id} className="h-full rounded-lg overflow-hidden">
              <img className="object-cover h-full" src={media.media_url} alt="" />
            </div>
          ))}
        </div>
      )}
      <div className="absolute opacity-70 px-2 h-8 rounded-lg bg-secondary2 top-3 right-3 flex flex-row items-center">
        <button onClick={openTweetModal} className="material-icons text-textStandard">
          launch
        </button>
      </div>
      <div className="absolute opacity-70 px-3 h-8 rounded-lg bg-secondary2 bottom-3 right-3 flex flex-row items-center">
        <div className="text-textStandard flex flex-row items-center">
          {tweet.favorite_count}
          <span className="material-icons ml-1.5 flex flex-row">favorite_border</span>
        </div>
        <div className="ml-3 text-textStandard flex flex-row items-center">
          {tweet.retweet_count}
          <span>
            <svg className=" ml-1.5" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default TweetContainer
