import { saveCookie, shuffleArray, getData } from "./common.js";
import { deleteCookie, getCookie } from "./cookie.js";

let navbar = document.querySelector(".navbar");
let navButton = document.querySelector(".navbar-login");

const loadHouses = async () => {
  let container = document.querySelector(".card_div");
  let card = document.querySelector(".card_div .card");
  let data = await getData(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php"
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

let forwardButton = document.getElementById("forward-button");
forwardButton.addEventListener("click", () => {
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");
  console.log(img1.style.opacity);
  if (img1.style.opacity == "1") {
    img1.style.opacity = "0";
    img2.style.opacity = "1";
  } else if (img2.style.opacity == "1") {
    img2.style.opacity = "0";
    img3.style.opacity = "1";
  } else if (img3.style.opacity == "1") {
    img3.style.opacity = "0";
    img1.style.opacity = "1";
  }
});

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  console.log("inside action listener");
  window.location.href =
    "http://127.0.0.1:5500/Frontend/pages/signup_page.html";
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("sticky", window.scrollY > 0);
});

let user = getCookie("User");

if (user) {
  user = JSON.parse(user);
  console.log(user.status);
  if (user.status == "L") {
    console.log("Add house");
    navButton.innerHTML = "Add House";
    navButton.src = "http://127.0.0.1:5500/Frontend/pages/addHousePage.html";
  } else if (user.status == "N") {
    navButton.innerHTML = "logout";
    navButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const res = await getData(
        "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
        ""
      );
      deleteCookie("User");
      location.reload();
    });
  }
}

loadHouses();
