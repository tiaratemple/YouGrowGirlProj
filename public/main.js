let plant = document.querySelector('img')

const helloAlert = evt => {
    alert("Well, ALOE there!")
};

const plantBtn = document.getElementById("plantButton")

const getPlantFact = () => {
    axios.get("http://localhost:4000/api/plantFact/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};



plantBtn.addEventListener('click', getPlantFact)



plant.addEventListener('click', helloAlert)
