const Rollbar = require('rollbar')

path = require('path')

module.exports = {
    getHTML : (req, res) => {
        console.log(__dirname)
        res.sendFile(path.join(__dirname, '../public/index.html'))
    },
    getCSS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles.css'))

    }, 
    getJS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/main.js'))
    },
    getPlantFact: (req, res) => {
        const plantFacts = ["70,000 plant species are utilized for medicine.", "Bamboo can grow 35 inches in a DAY!", "Plants with too much dust on their leaves won't get the sunshine they need.", "It is better to underwater your plants than to overwater them.", "In Holland, during the 1600's, tulips were more valuable than gold."];

        let randomIndex = Math.floor(Math.random() * plantFacts.length);
        let randomPlantFact = plantFacts[randomIndex];

        res.status(200).send(randomPlantFact);
    },

    getRollbar: (req, res) => {
        try {
            nonExistentFunction()
        } catch {
            Rollbar.error("This didn't work")
        }
        res.status(200).send("Welcome")
    }
}