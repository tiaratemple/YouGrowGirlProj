path = require('path')


const plants = require('./db.json')

module.exports = {
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    },

    getCSS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles.css'))
    },

    getJS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/main.js'))
    },

    
    getPlants: (req, res) => {
        res.status(200).send(plants)
    },

    updateLikes: (req, res) => {
        const { id } = req.params
        let result = plants.find((plant) => {
            return plant.id === parseInt(id)
        })
        result.Like += 1
        res.status(200).send(result)
    },

    getPlantFact: (req, res) => {
        const plantFacts = ["70,000 plant species are utilized for medicine.", "Bamboo can grow 35 inches in a DAY!", "Plants with too much dust on their leaves won't get the sunshine they need.", "It is better to underwater your plants than to overwater them.", "In Holland, during the 1600's, tulips were more valuable than gold.", "Ingesting oleander leaves can cause death.", "'Iris' means 'rainbow' in Greek.", "Trees are the longest-living organisms on earth.", "The calcium in eggshells can help neutralize the pH in your soil.", "The antifungal properties of cinnamon can help prevent seedlings from dying due to fungal diseases."];

        let randomIndex = Math.floor(Math.random() * plantFacts.length);
        let randomPlantFact = plantFacts[randomIndex];

        res.status(200).send(randomPlantFact);
    },

    addComment: (req, res) => {
        const { id, comment } = req.body
        let plantToAddComment = plants.find((plant) => {
            return plant.id === parseInt(id)
        })
        plantToAddComment.comments.push(comment)
        res.status(200).send(plants)
    }

    
}