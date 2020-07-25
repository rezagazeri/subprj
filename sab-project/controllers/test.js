let express = require('express'),
  router = express.Router()

router.all('/', (req, res) => {
  res.json('ok')
})

module.exports = router