const plantsContainer = document.getElementById("plants-container");
const plantFactContainer = document.getElementById("plant-fact-container");
const form = document.getElementById("form");
const plantBtn = document.getElementById("plantButton");
let inputField;
let plantCard;
let plantFactCard;
let commentInputField;
let currentPlantId;

const baseURL = "";

const plantsCallback = ({ data: plants }) => createPlantCard(plants);
const updateLikesCallback = ({ data: plant }) => updateLikeValue(plant);
const errCallback = (err) => console.log(err.response.data);

const getPlants = () => {
  if (plantCard) {
    plantCard.remove()
  }
  axios.get(`${baseURL}`)
  .then(plantsCallback)
  .catch(errCallback);
};

const updateLikes = (id) => {
  axios.put(`${baseURL}/${id}`)
  .then(updateLikesCallback)
  .catch(errCallback);
};

const getPlantFact = () => {
  document.getElementById('landing-page').style.display = "none";
  if (plantFactCard) {
    plantFactCard.remove()
  }
  axios.get(`${baseURL}/plantFacts`).then((res) => {
    const data = res.data;
    createPlantFactCard(data)
  });
};

const submitHandler = (e) => {
  e.preventDefault();
  inputField = document.getElementById("input");
  getPlants();
};

const createPlantCard = (plants) => {
  document.getElementById('landing-page').style.display = "none";
  if (plantCard) {
    plantCard.remove()
  }
  const plant = plants.find((plant) => {
    if (plant.name.toLowerCase().includes(inputField.value.toLowerCase())){
      return plant;
    }
  });

  currentPlantId = plant.id;

  const html = 
    '<ul>' +
      plant.comments.map((comment) => {
        return `<li class="test">${comment}</li>`
      }).join('') + 
    '</ul>';
  plantCard = document.createElement("div");

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
        <div>
          <form class="form" id="comment-form">
            <input 
              type="text" 
              name="comment" 
              class="comment-input-styles" 
              id="comment-input"
              placeholder="Add a comment"
            >
            </input>
            <button class="comment-btn-styles">
              Post
            </button>
          </form>
          <div>
            ${html}
          </div>
        </div>
      </div>
      <div class="care-list-container">
        <ul class="care-list">
          <li class="care-list-items">
            <i 
              style="font-size:24px" 
              class="fa">&#xf043;
            </i> 
            ${plant.careTips[0].water}</li>
          <li class="care-list-items">
            <i 
              style="font-size:24px" 
              class="fa">&#xf185;
            </i>
            ${plant.careTips[1].sunlight}
          </li>
          <li class="care-list-items">
            <i 
              style="font-size:24px" 
              class="fa">&#xf0e4;
            </i>
            ${plant.careTips[2].difficulty}
          </li>
        </ul>
      </div>
    </div>
  `;
  plantsContainer.appendChild(plantCard);
  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", addComment);
};

const updateLikeValue = (plant) => {
  document.getElementById("upvote").innerHTML = `${plant.Like}`;
};

const createPlantFactCard = (plantFact) => {
  plantFactCard = document.createElement("div");

  plantFactCard.classList.add("plant-fact-card");

  plantFactCard.innerHTML = `
    <div class="plant-fact-content">
      <div class="plant-fact-top">
        <button class="close-styles" id="close-btn">
          <i 
            style="font-size:24px" 
            class="fa">&#xf00d;
          </i>
        </button>
      </div>
      <p>
        ${plantFact}
      </p>
    </div>
  `;
  plantFactContainer.appendChild(plantFactCard);

  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", closeFactCard);
};

const closeFactCard = () => {
  if (plantFactCard) {
    plantFactCard.remove()
  }
};


const addComment = (e) => {
  e.preventDefault();
  commentInputField = document.getElementById("comment-input");
  const body = {
    id: currentPlantId,
    comment: commentInputField.value
  }
  axios.post(`${baseURL}/addComment/:id`, body)
  .then(plantsCallback)
  .catch(errCallback)
};

plantBtn.addEventListener("click", getPlantFact);
form.addEventListener("submit", submitHandler);