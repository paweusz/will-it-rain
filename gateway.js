const exp = require('express')
const ax = require('axios')
const app = exp()
app.get('/clouds', async (req, res) => {
    res.send(
        await ax.get('http://pogodynka.pl/api/radars/v1/list/cmax')
        .then(r => r.data.cmax.list)
    )
})
app.listen(8080)