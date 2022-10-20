let plant = document.querySelector('img')

const helloAlert = evt => {
    alert("Well, ALOE there!")
}

const plantBtn = document.getElementById("plantButton")




plantBtn.addEventListener('click', getPlantFact)



plant.addEventListener('click', helloAlert)
