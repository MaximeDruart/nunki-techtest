const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

const twitterRouter = require("./routes/twitter")
app.use("/", twitterRouter)

app.listen(PORT, () => console.log("listening on port " + PORT))
