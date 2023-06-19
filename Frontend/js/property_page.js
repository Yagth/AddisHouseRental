import { saveCookie, shuffleArray, getData } from "./common.js";
import { deleteCookie, getCookie } from "./cookie.js";

let navbar = document.querySelector(".navbar");
let navButton = $(".navbar-login");
let apartmentB = $("#apartment");
let villaB = $("#villa");
let houseB = $("#house");
let yourPropsB = $("#yourprops");

const searchForm = document.querySelector(".formm");
const searchInput = document.querySelector("#search");
const propertyTypeSelect = document.querySelector("#property_type");
const priceInput = document.querySelector("#price");
const searchButton = document.querySelector("#searchSubmit");
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
  query = "op=" + option + "&q=" + query;
  console.log(query);
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
    query
  );
  if (data.success) {
    clearContainer();
    let houses = shuffleArray(data.data);
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
  let temp = [searchInput.value, priceInput.value, propertyTypeSelect.value];
  let values = [];
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] != "") {
      values.push(temp[i]);
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
    successHandler(option);
  } else {
    // Otherwise show error message and highlight empty fields in red
    errorHandler();
  }
}

const filterHousesByTag = (tag) => {
  let housesDiv = document.querySelector(".card_div");
  let houseElements = housesDiv.children;

  for (let i = 0; i < houseElements.length; i++) {
    let house = houseElements[i];
    let houseTag = house.querySelector(".tag").textContent;

    if (houseTag !== tag) {
      house.classList.add("hidden");
    } else {
      house.classList.remove("hidden");
    }
  }
};

apartmentB.on("click", (event) => {
  villaB.removeClass("button-active").addClass("button-featured");
  houseB.removeClass("button-active").addClass("button-featured");
  apartmentB.addClass("button-active").removeClass("button-featured");

  filterHousesByTag("Apartment");
});

villaB.on("click", () => {
  apartmentB.removeClass("button-active").addClass("button-featured");
  houseB.removeClass("button-active").addClass("button-featured");
  villaB.addClass("button-active").removeClass("button-featured");

  filterHousesByTag("Villa");
});

houseB.on("click", () => {
  apartmentB.removeClass("button-active").addClass("button-featured");
  villaB.removeClass("button-active").addClass("button-featured");
  houseB.addClass("button-active").removeClass("button-featured");

  filterHousesByTag("House");
});

yourPropsB.on("click", () => {
  let userId = getCookie("User");
  userId = userId.id;
  searchAndLoad(3, userId);
});

searchButton.addEventListener("click", handleSearchSubmit);

searchInput.addEventListener("change", () => {
  console.log("Change");
  searchInput.style.border = "";
});

propertyTypeSelect.addEventListener("change", () => {
  console.log("Change");
  propertyTypeSelect.style.border = "";
});

priceInput.addEventListener("change", () => {
  console.log("Change");
  priceInput.style.border = "";
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("sticky", window.scrollY > 0);
});

let user = getCookie("User");

if (user) {
  user = JSON.parse(user);
  console.log(user.status);
  if (user.status == "L") {
    navButton.html("Add House");
    navButton.on("click", function () {
      $("#modal").toggle(".flex");
    });

    $(".close, .modal").on("click", function () {
      $("#modal").css("display", "none");
    });

    $(".modal-content").on("click", function (event) {
      event.stopPropagation();
    });
  } else if (user.status == "N") {
    navButton.html("logout");
    navButton.on("click", async (event) => {
      const res = await getData(
        "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
        ""
      );
      deleteCookie("User");
      location.reload();
    });
  } else {
    navButton.html("login");
    navButton.click(function () {
      window.location.href =
        "http://127.0.0.1:5500/Frontend/pages/login_page.html";
    });
  }
} else {
  navButton.html("login");
  navButton.on("click", function () {
    window.location.href =
      "http://127.0.0.1:5500/Frontend/pages/login_page.html";
  });
}

searchAndLoad();
