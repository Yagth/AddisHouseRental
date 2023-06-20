import { deleteCookie, getCookie } from "./cookie.js";

let container = document.querySelector(".card_div");
let card = document.querySelector(".card_div .card");

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

let house = getCookie("House");
house = JSON.parse(house);

let ownerId = house.owner_id;
//Filling in the information of the house from the cookie stored.
document.querySelector("houseDesc").textContent = house.house_description
  .split(" ")
  .splice(0, 4)
  .join(" "); //Take the first four words from the house description

document.querySelector("description").textContent = house.house_description;
document.querySelector("location").textContent = house.location;
document.querySelector("tag").textContent = house.house_tag;
document.querySelector("price").textContent = house.price;
document.querySelector("no_rooms").textContent = house.no_rooms;
document.querySelector("bed_rooms").textContent = house.bed_rooms;
document.querySelector("bath_rooms").textContent = house.bath_rooms;
document.querySelector("phonenumber").textContent = house.phonenumber;
document.querySelector("username").textContent = house.username;
document.querySelector("name").textContent = house.name;

searchAndLoad(3, ownerId);
