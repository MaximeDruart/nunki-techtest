import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import SearchResults from "./pages/SearchResults"

function App() {
  return (
    <div className="w-screen h-screen bg-background">
      <Router>
        <Switch>
          <Route path="/search/:keyword" component={SearchResults} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
