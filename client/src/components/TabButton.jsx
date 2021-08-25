import React from "react"
import { motion } from "framer-motion"

const TabButton = ({ activeTabIndex, keyword, index, closeTab, focusTab }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      positionTransition
      key={keyword + index}
      className={`border ${
        activeTabIndex === index ? "border-primarySoft" : "border-primarySofter"
      } mr-4 flex flex-row items-center text-textStandard rounded-md font-gilroy font-medium text-lg h-full px-3`}
    >
      <motion.button
        onClick={focusTab}
        className={`
          rounded-md h-10 px-4 transition-colors
           ${activeTabIndex === index ? "bg-primary1" : "bg-primary5 hover:bg-primary1"}
          `}
      >
        {keyword}
      </motion.button>
      <button
        onClick={closeTab}
        className={`
           h-10 w-10 border border-primarySoft transition rounded-md hover:border-none hover:bg-primary1 flex items-center ml-2 justify-center`}
      >
        <svg height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    </motion.li>
  )
}

export default TabButton
