const plantsContainer = document.getElementById('plants-container');
const form = document.getElementById('form');
const plantBtn = document.getElementById("plantButton");

const baseURL = `http://localhost:4000/api/plants`;

const plantsCallback = ({ data: plants }) => createPlantCard(plants);
const updateLikesCallback = ({ data: plant }) => updateLikeValue(plant);
const errCallback = err => console.log(err.response.data);
let inputField;

const getPlants = () => {
    axios.get(baseURL)
    .then(plantsCallback)
    .catch(errCallback)
};

const updateLikes = (id) => {
    axios.put(`${baseURL}/${id}`)
    .then(updateLikesCallback)
    .catch(errCallback)
};

const getPlantFact = () => {
    axios.get("http://localhost:4000/api/plantFacts/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const submitHandler =(e) => {
    e.preventDefault();
    inputField = document.getElementById('input')
    getPlants();
};

const createPlantCard = (plants) => {
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
            <span id='upvote'>${plant.Like}</span>
        <button onClick="updateLikes(${plant.id})">
            Upvote
        </button>
    `
    plantsContainer.appendChild(plantCard)
};

const updateLikeValue = (plant) => {
    document.getElementById('upvote').innerHTML = `${plant.Like}`
}

plantBtn.addEventListener('click', getPlantFact);
form.addEventListener('submit', submitHandler);