import { saveCookie, shuffleArray, getData } from "./common.js";

const searchForm = document.querySelector(".formm");
const searchInput = document.querySelector("#search");
const propertyTypeSelect = document.querySelector("#property_type");
const priceInput = document.querySelector("#price");
const searchButton = document.querySelector("#searchSumbit");
let container = document.querySelector(".card_div");
let card = document.querySelector(".card_div .card");

const clearContainer = () => {
  while (container.childElementCount > 1) {
    container.removeChild(container.lastChild);
  }
  container.children[0].classList.add("hidden");
};

const searchAndLoad = async (option = 4, query = "") => {
  // Add event listener to the search button
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
    "op=" + option + "&q=" + query
  );
  if (data.success) {
    let houses = shuffleArray(data.data);
    if (houses.length > 6) {
      houses = houses.slice(0, 6); //Take the first 6 elements of the array
    }
    houses.forEach((house) => {
      let newCard = card.cloneNode(true);
      let isHouse = ["Apartment", "Villa", "Home"].includes(house.house_tag);

      card.attributes.id = house.id;
      card.querySelector(".card_text1").textContent = "$" + house.price;
      card.querySelector(".card_text2").textContent = house.house_description;
      card.querySelector(".card_text3 span").textContent = house.location;
      let foots = card.querySelectorAll(".card-foot-c span");
      foots[0].textContent =
        (isHouse ? house.bed_rooms + house.bath_rooms : house.rooms) + " Rooms";
      foots[1].textContent = house.bed_rooms + " Beds";
      foots[2].textContent = house.bath_rooms + " Baths";
      card.querySelector("img").src =
        "http://127.0.0.1:5500/Backend/uploads/img/houses/" +
        house.pics[0][0]?.photo_url;
      card.classList.add("visible-card");
      container.appendChild(card);
      card.classList.remove("hidden");
      card = newCard;
    });
  } else {
    console.log(data.message);
  }
};

// Function to show a success message popup
function successHandler(option) {
  let temp = [searchInput.value, priceInput.value, house_tag.value];
  let values = [];
  for (let value in temp) {
    if (value != "") {
      values.push(value);
    }
  }
  let query = values.join(",");
  searchAndLoad(option, query);
}

// Function to show an error message and highlight the empty fields in red
function errorHandler() {
  if (searchInput.value === "") {
    searchInput.style.border = "2px solid red";
  }
  if (propertyTypeSelect.value === "") {
    propertyTypeSelect.style.border = "2px solid red";
  }
  if (priceInput.value === "") {
    priceInput.style.border = "2px solid red";
  }
}

// Function to handle the form submission
function handleSearchSubmit() {
  // Check how many form elements are filled
  let option;
  let filledCount = 0;
  if (searchInput.value !== "") {
    option = 0;
    filledCount++;
  }
  if (propertyTypeSelect.value !== "") {
    option = 1;
    filledCount++;
  }
  if (priceInput.value !== "") {
    option = 2;
    filledCount++;
  }
  if (filledCount === 3) {
    option = 5;
  }

  // Show success message if only one or three fields are filled, and the selected option is not empty
  if (filledCount === 1 || filledCount === 3) {
    clearContainer();
    successHandler();
  } else {
    // Otherwise show error message and highlight empty fields in red
    errorHandler();
  }
}

searchAndLoad();
searchButton.addEventListener("click", handleSearchSubmit);
