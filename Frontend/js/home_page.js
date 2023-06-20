import { saveCookie, shuffleArray, getData } from "./common.js";
import { deleteCookie, getCookie } from "./cookie.js";

let navbar = document.querySelector(".navbar");
let navButton = $(".navbar-login");
let apartmentB = $("#apartment");
let villaB = $("#villa");
let houseB = $("#house");
let browseB = $(".button-div .button-active");
let startButton = document.getElementById("start");

const loadHouses = async () => {
  let container = document.querySelector(".card_div");
  let card = document.querySelector(".card_div .card");
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php"
  );
  if (data.success) {
    let houses = shuffleArray(data.data);
    if (houses.length > 6) {
      houses = houses.slice(0, 6); //Take the first 6 elements of the array
    }
    houses.forEach((house) => {
      let newCard = card.cloneNode(true);
      let isHouse = ["Apartment", "Villa", "Home"].includes(house.house_tag);

      card.querySelector(".card_text1").textContent = "$" + house.price;
      card.querySelector(".card_text2").textContent = house.house_description;
      card.querySelector(".card_text3 span").textContent = house.location;
      card.querySelector(".tag").textContent = house.house_tag;

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

startButton.addEventListener("click", () => {
  window.location.href =
    "http://127.0.0.1:5500/Frontend/pages/signup_page.html";
});

browseB.click(() => {
  console.log("inside button");
  window.location.href = "http://127.0.0.1:5500/Frontend/pages/properties.html";
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

loadHouses();
