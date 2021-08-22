const router = require("express").Router()
const Twit = require("twit")

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  app_only_auth: true,
})

// @route GET /search?q=searchkeyword
// @desc searches content related to the keyword on twitter
// @access Public
router.get("/search", (req, res) => {
  T.get("search/tweets", { q: req.query.q, count: 4 }, (error, data, response) => {
    if (error) return res.status(error.statusCode || 500).json({ error })
    return res.status(200).json({ tweets: data.statuses })
  })
})

// @route GET /users/:id
// @desc gets detail of a user by id
// @access Public
router.get("/users/:id", (req, res) => {
  T.get(`users/lookup`, { user_id: req.params.id }, (error, data, response) => {
    if (error) return res.status(error.statusCode).json({ error })
    return res.status(200).json({ user: data })
  })
})

module.exports = router
