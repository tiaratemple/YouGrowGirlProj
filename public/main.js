const plantsContainer = document.getElementById('plants-container')
const form = document.getElementById('form');
const plantBtn = document.getElementById("plantButton")

const baseURL = `http://localhost:4000/api/plants`

const plantsCallback = ({ data: plants }) => createPlantCard(plants)
const errCallback = err => console.log(err.response.data)
let inputField;

const getPlants = () => {
    axios.get(baseURL)
    .then(plantsCallback)
    .catch(errCallback)
}

const updateLikes = (id) => {
    axios.put(`${baseURL}/${id}`)
    then(plantsCallback)
    .catch(errCallback)
}

const getPlantFact = () => {
    axios.get("http://localhost:4000/api/plantFacts/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
}

function submitHandler(e) {
    e.preventDefault();
    inputField = document.getElementById('input')
    getPlants();
}

function createPlantCard(plants) {
    const plant = plants.find((plant) => {
        if (inputField.value === plant.name) {
            return plant
        }
    });

    const plantCard = document.createElement('div');

    plantCard.classList.add('plant-card');

    plantCard.innerHTML = `
        <img alt='plant' src=${plant.img} class="movie-cover"/>
        <p class="plant-title">${plant.name}</p>
        <div class="care-tips-container">
            <ul>
                <li>${plant.careTips[0].water}</li>
                <li>${plant.careTips[1].sunlight}</li>
                <li>${plant.careTips[2].difficulty}</li>
            </ul>
        </div>
            ${plant.Like}
        <button onClick="updateLikes(${plant.id})">
            Upvote
        </button>
    `
    plantsContainer.appendChild(plantCard)
};

plantBtn.addEventListener('click', getPlantFact);
form.addEventListener('submit', submitHandler);