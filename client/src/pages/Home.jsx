import { useState } from "react"
import { useHistory } from "react-router-dom"

const Home = () => {
  const [input, setInput] = useState("")
  const history = useHistory()

  const handleChange = ({ target }) => {
    let { value } = target
    setInput(value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    input && history.push(`/search/${input}`)
  }

  return (
    <div className="w-screen h-screen px-8 flex items-center justify-center flex-col">
      <h1 className="text-center text-4xl font-gilroy font-medium text-textStandard">Tweet search</h1>
      <div className="mt-8 w-full">
        <form className="w-full lg:w-3/5 mx-auto flex flex-row" onSubmit={handleSubmit}>
          <input
            className="outline-none w-10/12 rounded-md h-11 pl-4 border border-primary1 bg-background text-textStandard text-lg border-black focus:border-3"
            onChange={handleChange}
            value={input}
            type="text"
          />
          <button
            className="ml-3 bg-primary1 text-textStandard rounded font-gilroy font-medium text-lg w-2/12"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
