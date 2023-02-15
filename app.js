const form = document.querySelector("#create-form");
const cardList = document.querySelector(".card-list ");
const filterRange = document.querySelector("#filter-range");
const filterRangeLabel = document.querySelector("#filter-range-label");

let idScore = 1;
// local array
let carList = localStorage.getItem("cars")
  ? JSON.parse(localStorage.getItem("cars"))
  : [];
if (carList) {
  carList.forEach((car) => {
    createCard(car);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let car = {
    id: idScore,
    brand: form.brand.value,
    name: form.name.value,
    speed: form.speed.value,
    price: form.price.value,
    imgUrl: form.url.value,
    color: form.color.value,
  };
  console.log(car);
  createCard(car);
  addCar(car);
  form.reset();
});

function addCar(carObj) {
  carList.push(carObj);
  idScore++;
  localStorage.setItem("cars", JSON.stringify(carList));
}
function getId(key) {
  let newArr = carList.filter((car) => {
    return car.id !== key;
  });
  cardList.innerHTML = "";
  carList = newArr;
  newArr.forEach((car) => {
    createCard(car);
  });
  localStorage.setItem("cars", JSON.stringify(carList));
}

function createCard(obj) {
  const { name, speed, price, imgUrl, color, brand, id } = obj;
  const div = document.createElement("div");
  div.classList.add("card");
  div.style.width = "18rem";
  div.innerHTML = `
  <img
    src="${imgUrl}"
    class="card-img-top object-fit-cover"
    style="width: 100%; height: 200px"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
  </div>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Car Brand:${brand}</li>
    <li class="list-group-item">Speed:${speed}km/s</li>
    <li class="list-group-item">Price:${price}$</li>
    <li class="list-group-item">
    Color: ${color};
    <span
        style="
            height: 20px;
            width: 20px;
            background-color: ${color};
            display: inline-block;
            border: 1px solid #222;
        "
    ></span>
</li>
  </ul>
  <div class= "card-body">
  <button class= "btn btn-danger" onclick="(getId(${id}))" >Delete</button>
   </div>

  `;
  cardList.appendChild(div);
  // onclick="
}



filterRange.addEventListener("input", () => {
  filterRangeLabel.textContent = `${filterRange.value} $`;
});

filterRange.addEventListener("change", () => {
  let inputCost = Number(filterRange.value);
  // filterRangeLabel.textContent = `${inputCost} $`;
  let newArr = carList.filter((car) => {
    return car.price <= inputCost;
  });
  cardList.innerHTML = "";
  newArr.forEach((car) => {
    createCard(car);
  });
});
