require('dotenv').config()
require('datejs')
const http = require('http');
const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))  

const modelsManager = require('./database/modelsManager.js')()

app.post('/countries-visitors-per-day', async (req, res) => {
    const countriesVisitorsPerDay = require('./database/services/countriesVisitorsPerDay.js')
    const { day } = req.body
    const resp = await countriesVisitorsPerDay(modelsManager.db.traveler, `2018-08-${day}`)
    res.send(resp)
})

app.post('/percentage-of-genders', async (req, res) => {
    const percentageOfGenders = require('./database/services/percentageOfGenders.js')
    const { day, country } = req.body
    const resp = await percentageOfGenders(modelsManager.db.traveler, `2018-08-${day}`, country)
    res.send(resp)
})

app.post('/nbr-of-visitors-by-nationality', async (req, res) => {
    const nbrOfVisitorsByNationality = require('./database/services/nbrOfVisitorsByNationality.js')
    const { day, country } = req.body
    const resp = await nbrOfVisitorsByNationality(modelsManager.db.traveler, `2018-08-${day}`, country)
    res.send(resp)
})

app.post('/nbr-of-people-within-age-range', async (req, res) => {
    const nbrOfPeopleWithinAgeRange = require('./database/services/nbrOfPeopleWithinAgeRange.js')
    const { day, country } = req.body
    const resp = await nbrOfPeopleWithinAgeRange(modelsManager.db.traveler, `2018-08-${day}`, country)
    res.send(resp)
})

http.createServer(app).listen(process.env.APP_PORT, function () {
    console.log("Running on port " + process.env.APP_PORT)
})