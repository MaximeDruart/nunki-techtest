const router = require("express").Router()
const Twit = require("twit")

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  app_only_auth: true,
})

/**
 * @swagger
 * /search?q=keyword:
 *   get:
 *     summary: Get a list of tweets related to keyword
 *     tags: [tweets]
 *     produces:
 *       - application/json
 *     description : Sends back a list of tweets related to keyword. If no tweets are found an  empty array will be sent
 *     parameters:
 *       - in: path
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword
 *       - in: path
 *         name: count
 *         schema:
 *           type: string
 *         description: (optional) the number of items you want to receive (defaults to 10)
 *     responses:
 *       200:
 *         description: The list of tweets
 */

router.get("/search", (req, res) => {
  T.get("search/tweets", { q: req.query.q, count: req.query.count || 10 }, (error, data, response) => {
    if (error) return res.status(error.statusCode || 500).json({ error })
    return res.status(200).json({ tweets: data.statuses })
  })
})

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Get the user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *       404:
 *         description: No user matches for specified terms.
 */

router.get("/users/:id", (req, res) => {
  T.get(`users/lookup`, { user_id: req.params.id }, (error, data, response) => {
    if (error) return res.status(error.statusCode).json({ error })
    return res.status(200).json({ user: data })
  })
})

module.exports = router
