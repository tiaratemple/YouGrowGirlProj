const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
//app.use(express.static('public'))

// include and initialize the rollbar library with your access token
// var Rollbar = require('rollbar')
// var rollbar = new Rollbar({
//   accessToken: '5e5624c1a4a94fc195ac2a9993925bf2',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// })

// record a generic message and send it to Rollbar
//rollbar.log('Hello world!')



const { getPlants, likePlants, getPlantFact} = require('./controller')


//app.get('/' , getHTML)
//app.get('/css' , getCSS)
//app.get('/js', getJS )
app.get('/api/plants', getPlants)
app.put('/api/plants/:id', likePlants)
app.get('/api/plantFacts', getPlantFact)
//app.get('rollbar', getRollbar)

//const port = process.env.PORT || 4000

//app.listen(port, console.log(`Server running on ${port}`))
app.listen(4000, () => console.log(`running on 4000`))