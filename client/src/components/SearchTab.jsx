import { AnimatePresence, motion } from "framer-motion"
import React, { useMemo } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import TweetContainer from "./TweetContainer"

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -20 },
}

const SearchTab = ({ keyword, tweets }) => {
  const mappedTweets = useMemo(
    () =>
      tweets.map((tweet, i) => <TweetContainer exit={{ x: -20, opacity: 0  }} variants={item} key={i} tweet={tweet} />),
    [tweets]
  )
  return (
    <PerfectScrollbar className="pr-4">
      <motion.div key="list" initial="hidden" animate="visible" variants={list}>
        {mappedTweets}
      </motion.div>
    </PerfectScrollbar>
  )
}

export default SearchTab
