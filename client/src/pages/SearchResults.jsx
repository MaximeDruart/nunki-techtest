import { AnimatePresence, motion } from "framer-motion"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import SearchTab from "../components/SearchTab"
import TabButton from "../components/TabButton"
import UserModal from "../components/UserModal"
import TweetModal from "../components/TweetModal"
import useStore from "../searchResultsStore"
import twitterSVG from "../assets/icons/twitter.svg"

const SearchResults = () => {
  // fetch the keyword in the url
  const urlKeyword = useParams().keyword

  const [searchData, setSearchData] = useState([])
  /** searchData will be an array containing each query and its resulting data, corresponding to each individual tab
   * [
   * {keyword : "chicken", tweets : [array of tweets from the api] },
   * ...one object for each tab
   * ]
   */

  const [error, setError] = useState(null)
  const [input, setInput] = useState("")
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const setUserModal = useStore((state) => state.setUserModal)
  const closeUserModal = useCallback(() => setUserModal({ isOpen: false }), [setUserModal])
  const setTweetModal = useStore((state) => state.setTweetModal)
  const closeTweetModal = useCallback(() => setTweetModal({ isOpen: false }), [setTweetModal])

  const [isLoading, setIsLoading] = useState(true)

  const handleChange = ({ target }) => setInput(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (input) {
      getTweetsForKeyword(input)
      setInput("")
    }
  }

  const getTweetsForKeyword = useCallback((keyword) => {
    setIsLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/search/?q=${keyword}`)
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
      .then((res) => res.json())
      .then(({ tweets }) => {
        setSearchData((searchData) => {
          // push the data from the api into the searchData array
          const newSearchData = [...searchData, { keyword, tweets }]
          // make it the active tab
          setActiveTabIndex(newSearchData.length - 1)
          setIsLoading(false)
          return newSearchData
        })
      })
  }, [])

  const closeTab = (tabIndex) => {
    // if we close the last tab && tab.length > 1 make the previous one active
    if (tabIndex === searchData.length - 1 && searchData.length > 1) setActiveTabIndex(searchData.length - 2)
    // if we close the tab that's not open we need to adjust that the the length is minus 1 and activetabindex should be minus 1 too BUT only if the closed unfocus tab is before the focused tab :P
    if (tabIndex !== activeTabIndex && tabIndex < activeTabIndex)
      setActiveTabIndex((activeTabIndex) => activeTabIndex - 1)
    setSearchData((searchData) => searchData.filter((_, i) => i !== tabIndex))
  }
  const focusTab = (tabIndex) => {
    setActiveTabIndex(tabIndex)
  }
  const clearTabs = () => {
    setSearchData([])
  }

  // we're querying the api a first time on load for the keyword in the url
  useEffect(() => {
    getTweetsForKeyword(urlKeyword)
  }, [urlKeyword])

  const mappedTabs = useMemo(
    () =>
      searchData.map(({ keyword }, i) => (
        <TabButton
          key={keyword + i}
          index={i}
          keyword={keyword}
          activeTabIndex={activeTabIndex}
          closeTab={() => closeTab(i)}
          focusTab={() => focusTab(i)}
        />
      )),
    [searchData, activeTabIndex]
  )

  // placeholder tweets while setIsLoading = false
  const loadingPlaceholders = useMemo(
    () =>
      new Array(5)
        .fill("")
        .map((_, i) => (
          <motion.div
            key={i}
            style={{ height: 80 + (Math.random() - 0.5) * 40 }}
            animate={{ opacity: 0.6 }}
            transition={{ ease: "linear", duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="relative w-full p-4 pb-10 bg-secondary1 rounded-lg mb-5 flex flex-row h-20"
          ></motion.div>
        )),
    []
  )

  // trying to keep the most logic out of the html
  const activeTabData = useMemo(() => searchData[activeTabIndex], [searchData, activeTabIndex])
  return (
    <div className="w-full h-full px-8 pt-10">
      <TweetModal closeModal={closeTweetModal} />
      <UserModal closeModal={closeUserModal} />
      <form className="w-full flex flex-row h-11" onSubmit={handleSubmit}>
        <input
          className="outline-none w-8/12 md:w-10/12 lg:w-11/12 rounded-md h-11 pl-4 border border-primary1 bg-background text-textStandard text-lg focus:border-3"
          onChange={handleChange}
          value={input}
          type="text"
        />
        <button
          disabled={!input}
          className={`ml-3 ${
            input ? "bg-primary1" : "bg-primary5"
          } transition-colors text-textStandard rounded font-gilroy font-medium text-lg w-4/12 md:w-2/12 lg:w-1/12`}
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="w-full mt-6 flex flex-row justify-between items-center">
        <ul className="flex flex-row w-10/12 h-16">{mappedTabs}</ul>
        <button
          onClick={clearTabs}
          disabled={!searchData.length}
          className={`${
            searchData.length ? "bg-negative1" : "bg-negative2"
          } text-textStandard rounded font-gilroy font-medium text-lg py-2 px-6 transition-colors`}
        >
          Clear tabs
        </button>
      </div>
      <div className="w-full mt-2 h-5/6 border rounded-lg border-primarySofter p-4 pr-3">
        {/* covering every cases possible : if it's loading -> if there's data / no data -> if there's an error */}
        <AnimatePresence>
          {isLoading ? (
            <motion.div>{loadingPlaceholders}</motion.div>
          ) : activeTabData ? (
            error ? (
              <h3 className="text-xl text-warning1">{error}</h3>
            ) : activeTabData.tweets.length ? (
              <SearchTab
                key={activeTabData.tweets[0].id}
                keyword={activeTabData.keyword}
                tweets={activeTabData.tweets}
              />
            ) : (
              <h3 className="text-negative1 text-xl font-gilroy font-bold">
                No tweets found for keyword {activeTabData.keyword}
              </h3>
            )
          ) : (
            <div className="relative w-full h-full">
              <h3 className="text-textStandard text-2xl font-medium">Make a search !</h3>
              <div className="">
                <img
                  className="opacity-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                  src={twitterSVG}
                  alt=""
                />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchResults
