import { deleteCookie, getCookie } from "./cookie.js";
import { getData } from "./common.js";

let navButton = $(".navbar-login");
let container = document.querySelector(".card_div");
let card = document.querySelector(".card_div .card");
let tagName = document.querySelector(".tag");

const searchAndLoad = async (option = 4, query = "") => {
  // Add event listener to the search button
  query = "op=" + option + "&q=" + query;
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
    query
  );
  if (data.success) {
    let houses = data.data;
    houses.forEach((house) => {
      let newCard = card.cloneNode(true);
      let isHouse = ["Apartment", "Villa", "Home"].includes(house.house_tag);

      card.attributes.id = house.id;
      card.querySelector(".card_text1").textContent = "$" + house.price;
      card.querySelector(".card_text2").textContent = house.house_description;
      card.querySelector(".card_text3 span").textContent = house.location;
      tagName.textContent = house.house_tag;
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

const getOwner = async (ownerId) => {
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/user/get_users.php",
    "id=" + ownerId
  );
  if (data.success) {
    return data.data;
  } else {
    return null;
  }
};
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

let house = getCookie("House");

house = JSON.parse(house);
console.log(house);

let ownerId = house.owner_id;
let owner = await getOwner(ownerId);
owner = owner[0];
console.log(owner);

//Filling in the information of the house from the cookie stored.
document.querySelector("#houseDesc").textContent = house.house_description
  .split(" ")
  .splice(0, 4)
  .join(" "); //Take the# first four words from the house description

document.querySelector("#description").textContent = house.house_description;
document.querySelector("#location").textContent = house.location;
document.querySelector("#tag").textContent = house.house_tag;
document.querySelector("#price").textContent = house.price;
document.querySelector("#no_rooms").textContent = house.no_rooms;
document.querySelector("#bed_rooms").textContent = house.bed_rooms;
document.querySelector("#bath_rooms").textContent = house.bath_rooms;
document.querySelector("#phonenumber").textContent = owner.phonenumber;
document.querySelector("#username").textContent = owner.username;
document.querySelector("#name").textContent =
  owner.firstname + " " + owner.lastname;
document.querySelector(".property-div h1").textContent += " " + house.owner;

searchAndLoad(3, ownerId);
