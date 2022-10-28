const plantsContainer = document.getElementById("plants-container");
const form = document.getElementById("form");
const plantBtn = document.getElementById("plantButton");

const baseURL = `http://localhost:4000/api/plants`;

const plantsCallback = ({ data: plants }) => createPlantCard(plants);
const updateLikesCallback = ({ data: plant }) => updateLikeValue(plant);
const errCallback = (err) => console.log(err.response.data);
let inputField;

const getPlants = () => {
  axios.get(baseURL).then(plantsCallback).catch(errCallback);
};

const updateLikes = (id) => {
  axios.put(`${baseURL}/${id}`).then(updateLikesCallback).catch(errCallback);
};

const getPlantFact = () => {
  axios.get("http://localhost:4000/api/plantFacts/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const submitHandler = (e) => {
  e.preventDefault();
  inputField = document.getElementById("input");
  getPlants();
};

const createPlantCard = (plants) => {
  const plant = plants.find((plant) => {
    if (inputField.value === plant.name) {
      return plant;
    }
  });

  const plantCard = document.createElement("div");

  plantCard.classList.add("plant-card");

  plantCard.innerHTML = `
    <div class="row">
      <div class="column">
        <div class="img-container">
          <img 
            alt='plant' 
            src=${plant.img}
            class="img-styles"
          />
        </div>
        <div class="column-icons">
          <h2 class="plant-title">
            ${plant.name}
          </h2>
          <button 
            onClick="updateLikes(${plant.id})"
            class="upvote-btn"
          >
            <i 
              class="fa fa-heart-o"
              style="font-size:24px"
            >
            </i>
            <span id='upvote' class="upvote-number-styles">
              ${plant.Like}
            </span>
          </button>
        </div>
      </div>
      <ul>
        <li>
          <i 
            style="font-size:24px" 
            class="fa">&#xf043;
          </i> 
          ${plant.careTips[0].water}</li>
        <li>
          <i 
            style="font-size:24px" 
            class="fa">&#xf185;
          </i>
          ${plant.careTips[1].sunlight}
        </li>
        <li>
          <i 
            style="font-size:24px" 
            class="fa">&#xf0e4;
          </i>
          ${plant.careTips[2].difficulty}
        </li>
      </ul>
    </div>
  `;
  plantsContainer.appendChild(plantCard);
};

const updateLikeValue = (plant) => {
  document.getElementById("upvote").innerHTML = `${plant.Like}`;
};

plantBtn.addEventListener("click", getPlantFact);
form.addEventListener("submit", submitHandler);