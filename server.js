const express = require("express")
const cors = require("cors")
const app = express()
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
require("dotenv").config()

const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Twitter API",
      version: "1.0.0",
      description: "Express twitter API",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

const twitterRouter = require("./routes/twitter")
app.use("/api", twitterRouter)

// for heroku prod
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  })
}

app.listen(PORT, () => console.log("listening on port " + PORT))
