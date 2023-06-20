import { deleteCookie, getCookie } from "./cookie.js";
import { getData, saveCookie } from "./common.js";

let navButton = $(".navbar-login");
let container = document.querySelector(".card_div");
let card = document.querySelector(".card_div .card");

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
      card.addEventListener("click", async () => {
        const data = await getData(
          "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
          "id=" + house.id
        );
        saveCookie("House", data.data);
        window.location.href =
          "http://127.0.0.1:5500/Frontend/pages/detail_page.html";
      });
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
    navButton.html("Edit House");
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
let picUrls = house.pics[0];
console.log(house.pics[0]);

let ownerId = house.owner_id;
let owner = await getOwner(ownerId);
owner = owner[0];
let owner_name = owner.firstname + " " + owner.lastname;
console.log(house);

//Filling in the information of the house from the cookie stored.
document.querySelector("#houseDesc").textContent = house.house_description
  .split(" ")
  .splice(0, 4)
  .join(" "); //Take the# first four words from the house description

document.querySelector(".detail-container #description").textContent =
  house.house_description;
document.querySelector(".detail-container #location").textContent =
  house.location;
document.querySelector(".detail-container #tag").textContent = house.house_tag;
document.querySelector(".detail-container #price").textContent = house.price;
document.querySelector(".detail-container #no_rooms").textContent =
  house.no_rooms;
document.querySelector(".detail-container #bed_rooms").textContent =
  house.bed_rooms;
document.querySelector(".detail-container #bath_rooms").textContent =
  house.bath_rooms;
document.querySelector(".detail-container #phonenumber").textContent =
  owner.phonenumber;
document.querySelector(".detail-container #email").textContent = owner.email;
document.querySelector(".detail-container #username").textContent =
  "@" + owner.telegram_username;
document.querySelector(".detail-container #name").textContent = owner_name;
document.querySelector(".detail-container #image").src =
  "http://127.0.0.1:5500/Backend/uploads/img/houses/" + picUrls[0]?.photo_url;
console.log(
  "http://127.0.0.1:5500/Backend/uploads/img/houses/" + picUrls[0]?.photo_url
);

document.querySelector(".property-div h1").textContent += " " + owner_name;

searchAndLoad(3, ownerId);

//Filling the form for editing the house
document.querySelector(".modal #house_tag #" + house.house_tag).selected = true;
document.querySelector(".modal #desc").value = house.house_description;
document.querySelector(".modal #location").value = house.location;
document.querySelector(".modal #price").value = house.price;
document.querySelector(".modal #no_rooms_input").value = house.no_rooms;
document.querySelector(".modal #bed_rooms_input").value = house.bed_rooms;
document.querySelector(".modal #bath_rooms_input").value = house.bath_rooms;
