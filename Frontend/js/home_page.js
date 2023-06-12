import { shuffleArray } from "./common.js";

const loadHouses = async () => {
  let container = document.querySelector(".card_div");
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
      console.log(data.data);
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

startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  console.log("inside action listener");
  window.location.href =
    "http://127.0.0.1:5500/Frontend/pages/signup_page.html";
});

loadHouses();
