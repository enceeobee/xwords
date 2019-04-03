const axios = require('axios')
const express = require('express')
const cors = require('express-cors')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(cors({ allowedOrigins: ['localhost:3000', 'localhost:5000'] }))

app.get('/xword', (req, res, next) => {
  const params = { format: 'text' }

  if (req.query.date) params.date = req.query.date

  axios('https://www.xwordinfo.com/JSON/Data.aspx', {
    params,
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'upgrade-insecure-requests': '1',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
      Referer: 'https://www.xwordinfo.com/JSON/'
    }
  })
    .then(({ data }) => res.json(data))
    .catch(e => res.status(500).send(e.toString()))
})

app.listen(3333, () => console.log('xwords listening on 3333'))
