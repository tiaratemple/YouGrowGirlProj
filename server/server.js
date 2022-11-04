const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const { getHTML, getCSS, getJS, getPlants, updateLikes, getPlantFact, addComment } = require('./controller')


app.get('/' , getHTML)
app.get('/css' , getCSS)
app.get('/js', getJS )
app.get('/api/plants', getPlants)
app.put('/api/plants/:id', updateLikes)
app.get('/api/plantFacts', getPlantFact)
app.post('/api/plants/addComment/:id', addComment)

const port = process.env.PORT || 4000

app.listen(port, console.log(`Server running on ${port}`))
//app.listen(4000, () => console.log(`running on 4000`))