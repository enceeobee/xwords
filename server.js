const axios = require('axios')
const express = require('express')
const helmet = require('helmet')
const cors = require('express-cors')

const app = express()

app.use(helmet())
app.use(cors({ allowedOrigins: ['localhost:3000'] }))

app.get('/xword', (req, res, next) => {
  const params = { format: 'text' }

  if (req.query.date) params.date = req.query.date

  axios('https://www.xwordinfo.com/JSON/Data.aspx', {
    params,
    headers: {
      Referer: 'https://www.xwordinfo.com/JSON/'
    }
  })
    .then(({ data }) => res.json(data))
    .catch(e => res.status(500).send(e.toString()))
})

app.listen(3333, () => console.log('xwords listening on 3333'))
