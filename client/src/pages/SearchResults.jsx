import { useState, useEffect, useMemo } from "react"
import SearchItem from "../components/SearchItem"
import { useParams } from "react-router-dom"

const SearchResults = () => {
  const { keyword } = useParams()
  const [input, setInput] = useState("")
  const handleChange = ({ target }) => {
    let { value } = target
    setInput(value)
  }

  const [searchData, setSearchData] = useState(["a", "b", "c"])

  const [error, setError] = useState(null)

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/search/?q=${keyword}`)
  //     .catch((err) => setError(err))
  //     .then((res) => res.json())
  //     .then((data) => setSearchData(data))
  // }, [])

  const mappedSearchItems = useMemo(
    () => searchData.map((tweet, i) => <SearchItem key={i} tweet={tweet} />),
    [searchData]
  )

  return (
    <div className="w-full h-full px-8">
      <div className="head">
        <input
          className="outline-none w-full rounded-md h-11 pl-4 border border-primary1 bg-background text-textStandard text-lg border-black focus:border-3"
          onChange={handleChange}
          value={input}
          type="text"
        />
        <div className="w-full mt-20">
          {error ? <h3 className="text-xl text-warning1">{error}</h3> : mappedSearchItems}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
