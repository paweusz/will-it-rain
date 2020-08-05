const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.static('public'))

const CMAX_DATA_URL = "http://pogodynka.pl/api/radars/v1/list/cmax"
const URL_PREFIX = "api"

app.get(`/${URL_PREFIX}/cmax`, async (req, res) => {
    res.send(
        await axios
          .get(CMAX_DATA_URL)
          .then(r => r.data.cmax.list)
    )
})

app.listen(3000)