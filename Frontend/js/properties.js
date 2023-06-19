import { saveCookie, shuffleArray, getData } from "./common.js";

const searchForm = document.querySelector(".formm");
const searchInput = document.querySelector("#search");
const propertyTypeSelect = document.querySelector("#property_type");
const priceInput = document.querySelector("#price");
const searchButton = document.querySelector("#searchSumbit");
const form = document.querySelector("#searchForm");

const searchHouses = async (searchParams) => {
  let container = document.querySelector(".card_div");
  let card = document.querySelector(".card_div .card");

  // Add event listener to the search button
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
    ""
  );
  if (data.success) {
    let houses = shuffleArray(data.data);
    if (houses.length > 12) {
      houses = houses.slice(0, 12);
    }
    houses.forEach((house) => {
      let newCard = card.cloneNode(true);
      let isHouse = ["Apartment", "Villa", "Home"].includes(house.house_tag);

      card.attributes.id = house.id;
      card.querySelector(".card_text1").textContent = "$" + house.price;
      card.querySelector(".card_text2").textContent = house.house_description;
      card.querySelector(".card_text3").textContent = house.location;
      let foots = card.querySelectorAll(".card-foot-c");
      foots[0].textContent =
        (isHouse ? house.bed_rooms + house.bath_rooms : house.rooms) + " Rooms";
      foots[1].textContent = house.bed_rooms + " Beds";
      foots[2].textContent = house.bath_rooms + " Baths";
      card.querySelector("img").src =
        "http://127.0.0.1:5500/Backend/uploads/img/houses/" +
        house.pics[0][0].photo_url;
      card.classList.add("visible-card");
      container.appendChild(card);
      card.classList.remove("hidden");
      card = newCard;
    });
    saveCookie("houses", { houseArray: houses });
  } else {
    console.log(data.message);
  }
};

// Function to show a success message popup
function showSuccessMessage() {
  alert("U have submitted successfully My coder😘😍");
}

// Function to show an error message and highlight the empty fields in red
function showErrorMessage() {
  alert("Fill again 😡😡");
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
  let filledCount = 0;
  if (searchInput.value !== "") {
    filledCount++;
  }
  if (priceInput.value !== "") {
    filledCount++;
  }
  if (propertyTypeSelect.value !== "") {
    filledCount++;
  }

  // Show success message if only one or three fields are filled, and the selected option is not empty
  if (filledCount === 1 || filledCount === 3) {
    showSuccessMessage();
  } else {
    // Otherwise show error message and highlight empty fields in red
    showErrorMessage();
  }
}

searchButton.addEventListener("click", handleSearchSubmit);
