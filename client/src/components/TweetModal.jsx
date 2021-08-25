import { AnimatePresence, motion } from "framer-motion"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import useStore from "../searchResultsStore"
import Modal from "./Modal"
import { getTweetAgeString } from "../assets/utils/functions"

const cardAnimProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { ease: "easeOut" },
}

const TweetModal = ({ closeModal }) => {
  const tweetModal = useStore((state) => state.tweetModal)
  const [activeTweetIndex, setActiveTweetIndex] = useState(tweetModal.tweetIndex || 0)

  const [tweet, setTweet] = useState(null)

  const clamper = useCallback((value) => Math.min(Math.max(value, 0), tweetModal.tweets.length - 1), [tweetModal])

  const goNextTweet = useCallback(
    () => setActiveTweetIndex((activeTweetIndex) => clamper(activeTweetIndex + 1)),
    [clamper, setActiveTweetIndex]
  )
  const goPrevTweet = useCallback(
    () => setActiveTweetIndex((activeTweetIndex) => clamper(activeTweetIndex - 1)),
    [clamper, setActiveTweetIndex]
  )

  useEffect(() => {
    setActiveTweetIndex(tweetModal.tweetIndex)
    if (tweetModal.tweets.length) {
      setTweet(tweetModal.tweets[tweetModal.tweetIndex])
    }
  }, [tweetModal])

  useEffect(() => {
    setTweet(tweetModal.tweets[activeTweetIndex])
  }, [activeTweetIndex])

  return (
    <AnimatePresence>
      {tweetModal.isOpen && tweet && (
        <Modal cardAnimProps={cardAnimProps} key={activeTweetIndex} closeModal={closeModal}>
          <div className="bg-secondary1 rounded-lg relative flex flex-row p-6 px-8 pb-10">
            <motion.button
              style={{ opacity: activeTweetIndex === 0 ? 0.2 : 1 }}
              disabled={activeTweetIndex === 0}
              onClick={goPrevTweet}
              className="p-10  absolute top-1/2 -translate-y-1/2 -left-28 material-icons text text-textStandard"
            >
              arrow_back_ios
            </motion.button>
            <motion.button
              style={{ opacity: activeTweetIndex === tweetModal.tweets.length - 1 ? 0.2 : 1 }}
              disabled={activeTweetIndex === tweetModal.tweets.length - 1}
              onClick={goNextTweet}
              className="p-10  absolute top-1/2 -translate-y-1/2 -right-28 material-icons text text-textStandard"
            >
              arrow_forward_ios
            </motion.button>
            <div className="absolute top-4 right-6">
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.08, rotate: 5 }}
                className="material-icons ml-1.5 flex flex-row text-textStandard"
              >
                close
              </motion.button>
            </div>
            <div className="rounded-lg h-14 w-14 overflow-hidden flex-shrink-0">
              <img className="object-cover w-full h-full" src={tweet.user.profile_image_url} alt="Tweet user" />
            </div>
            <div className="ml-4">
              <div className="text-textStandard">
                <a
                  href={`http://twitter.com/${tweet.user.screen_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textDisabled max-w-xs md:max-w-md"
                >
                  <span className="font-bold text-textStandard">{tweet.user.name}</span>
                  <span className="ml-1 text-textDisabled">@{tweet.user.screen_name}</span>
                </a>
                <span> -</span>
                <span className="ml-1 text-textDisabled">{getTweetAgeString(tweet.created_at)}</span>
              </div>
              <div className="text-textStandard mb-4 font-gilroy font-medium text-base max-w-xs md:max-w-md">
                {tweet.text}
              </div>
            </div>
            <div className="absolute opacity-70 px-3 h-8 rounded-lg bg-secondary2 bottom-4 right-4 flex flex-row items-center">
              <div className="text-textStandard flex flex-row items-center">
                {tweet.favorite_count}
                <span className="material-icons ml-1.5 flex flex-row">favorite_border</span>
              </div>
              <div className="ml-3 text-textStandard flex flex-row items-center">
                {tweet.retweet_count}
                <span>
                  <svg className=" ml-1.5" width="24" height="24" viewBox="0 0 24 24">
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
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default TweetModal
