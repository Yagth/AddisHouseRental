import { saveCookie, shuffleArray } from "./common.js";

const loadHouses = async () => {
  let container = document.querySelector(".card_div");
  let card = document.querySelector(".card_div .card");
  try {
    const res = await fetch(
      "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
      { method: "GET" }
    );
    const data = await res.json();
    if (data.success) {
      let houses = shuffleArray(data.data);
      if (houses.length > 12) {
        houses = houses.slice(0, 12);
      }
      houses.forEach((house) => {
        let newCard = card.cloneNode(true);
        card.attributes.id = house.id;
        card.querySelector(".card_text1").textContent = "$" + house.price;
        card.querySelector(".card_text2").textContent =
          "Golden Urban House For Sell";
        card.querySelector(".card_text3").textContent =
          "123 street , new york,usa";
        card.querySelectorAll(".card-foot-c")[1].textContent =
          house.rooms + " Rooms";
        card.querySelector("img").src =
          "http://127.0.0.1:5500/Backend/uploads/img/houses/" +
          house["pics"][0].photo_url;
        card.classList.add("visible-card");
        container.appendChild(card);
        card.classList.remove("hidden");
        card = newCard;
      });
      saveCookie("houses", { houseArray: houses });
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log("Error" + error.message);
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

loadHouses();
