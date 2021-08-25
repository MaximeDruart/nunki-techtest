import { AnimatePresence } from "framer-motion"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import SearchTab from "../components/SearchTab"
import TabButton from "../components/TabButton"
import UserModal from "../components/UserModal"
import TweetModal from "../components/TweetModal"
import useStore from "../searchResultsStore"

const SearchResults = () => {
  const urlKeyword = useParams().keyword

  const [searchData, setSearchData] = useState([])
  const [error, setError] = useState(null)
  const [input, setInput] = useState("")
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const setUserModal = useStore((state) => state.setUserModal)
  const closeUserModal = useCallback(() => setUserModal({ isOpen: false }), [setUserModal])
  const setTweetModal = useStore((state) => state.setTweetModal)
  const closeTweetModal = useCallback(() => setTweetModal({ isOpen: false }), [setTweetModal])

  const [isLoading, setIsLoading] = useState(true)

  const handleChange = ({ target }) => {
    let { value } = target
    setInput(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setInput("")
    getTweetsForKeyword(input)
  }

  const getTweetsForKeyword = useCallback((keyword) => {
    fetch(`${import.meta.env.VITE_API_URL}/search/?q=${keyword}`)
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
      .then((res) => res.json())
      .then(({ tweets }) => {
        setSearchData((searchData) => {
          const newSearchData = [...searchData, { keyword, tweets }]
          setActiveTabIndex(newSearchData.length - 1)
          setIsLoading(false)
          return newSearchData
        })
      })
  }, [])

  const closeTab = (tabIndex) => {
    setSearchData((searchData) => searchData.filter((_, i) => i !== tabIndex))
  }
  const focusTab = (tabIndex) => {
    setActiveTabIndex(tabIndex)
  }
  const clearTabs = () => {
    setSearchData([])
  }

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

  const activeTabData = searchData[activeTabIndex]
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
          className="ml-3 bg-primary1 text-textStandard rounded font-gilroy font-medium text-lg w-4/12 md:w-2/12 lg:w-1/12"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="w-full mt-6 flex flex-row justify-between items-center">
        <ul className="flex flex-row w-10/12">{mappedTabs}</ul>
        <div className="">
          <button
            onClick={clearTabs}
            className="bg-negative1 text-textStandard rounded font-gilroy font-medium text-lg py-3 px-6"
          >
            Clear tabs
          </button>
        </div>
      </div>
      <div className="w-full mt-2 h-5/6 border rounded-lg border-primarySofter p-4 pr-3">
        <AnimatePresence exitBeforeEnter>
          {activeTabData ? (
            error ? (
              <h3 className="text-xl text-warning1">{error}</h3>
            ) : isLoading ? (
              "is loading"
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
            <h3 className="text-textStandard">Make a search !</h3>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchResults
