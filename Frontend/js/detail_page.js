import { deleteCookie, getCookie } from "./cookie.js";
import { getData, postData, saveCookie } from "./common.js";

let navButton = $("nav .navbar-login");
let editButton = $("#editButton");
let deleteButton = $("#deleteButton");
let container = document.querySelector(".card_div");
let card = document.querySelector(".card_div .card");
let rentButton = $(".toggle-switch");
let rentedP = $("#rented");
let house = JSON.parse(getCookie("House"));
let rented = house.status === "R";
let detailContainer = document.querySelector(".detail-container");

if (rented) {
  rentButton.toggleClass("active");
  rentedP.html("Rented");
}

rentButton.click(async function () {
  console.log(rented);
  if (!rented) {
    rentedP.html("Rented");
    let house = JSON.parse(getCookie("House"));
    let formData = new FormData();
    formData.append("house_id", house.id);
    formData.append("user_id", 43);
    formData.append("end_date", "");
    $(this).toggleClass("active");
    const _ = await postData(
      "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/house/rent_house.php",
      formData
    );
    if (_.success) {
      house.status = "R";
      console.log(house);
      saveCookie("House", house);
    }
  } else {
    rentedP.html("Rented");
    return;
  }
});

const searchAndLoad = async (option = 4, query = "") => {
  // Add event listener to the search button
  query = "op=" + option + "&q=" + query;
  let data = await getData(
    "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
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
        "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/uploads/img/houses/" +
        house.pics[0][0]?.photo_url;
      card.classList.add("visible-card");
      container.appendChild(card);
      card.classList.remove("hidden");
      card.addEventListener("click", async () => {
        const data = await getData(
          "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/house/get_house.php",
          "id=" + house.id
        );
        saveCookie("House", data.data);
        window.location.href =
          "http://127.0.0.1:8080/PHP/AddisHouseRental/Frontend/pages/detail_page.html";
      });
      card = newCard;
    });
  } else {
    console.log(data.message);
  }
};

const getOwner = async (ownerId) => {
  let data = await getData(
    "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/user/get_users.php",
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
    navButton.html("logout");
    navButton.on("click", async (event) => {
      deleteCookie("User");
      location.reload();
    });
    editButton.show();
    deleteButton.show();
    rentButton.show();
    deleteButton.on("click", async () => {
      let choice = confirm("Are you sure you want to delete it?");
      if (choice) {
        let house = getCookie("House");
        house = JSON.parse(house);
        try {
          let res = await fetch(
            "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/house/delete_house.php?id=" +
              house.id,
            { method: "Delete" }
          );
          console.log(
            "Delete url: http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/house/delete_house.php?id=" +
              house.id
          );
          res = await res.json();
          console.log(res);
          if (res.success) {
            alert("House deleted successfully");
            window.location.href =
              "http://127.0.0.1:8080/PHP/AddisHouseRental/Frontend/pages/properties.html";
          } else {
            // console.log(await res.text());
            alert("House can't be deleted for some reason");
          }
        } catch (error) {
          console.log(error);
          console.log("Delete failed");
        }
      }
    });

    editButton.on("click", function () {
      $("#modal").toggle(".flex");
    });

    $(".close, .modal").on("click", function () {
      $("#modal").css("display", "none");
      loadInformation();
    });

    $(".modal-content").on("click", function (event) {
      event.stopPropagation();
    });
  } else if (user.status == "N") {
    editButton.hide();
    deleteButton.hide();
    rentButton.hide();

    navButton.html("logout");
    navButton.on("click", async (event) => {
      deleteCookie("User");
      location.reload();
    });
  } else {
    editButton.hide();
    deleteButton.hide();
    navButton.html("login");
    navButton.click(function () {
      window.location.href =
        "http://127.0.0.1:8080/PHP/AddisHouseRental/Frontend/pages/login_page.html";
    });
  }
} else {
  navButton.html("login");
  navButton.on("click", function () {
    window.location.href =
      "http://127.0.0.1:8080/PHP/AddisHouseRental/Frontend/pages/login_page.html";
  });
  rentButton.hide();
}

const loadInformation = async () => {
  //Filling in the information of the house from the cookie stored.
  let house = getCookie("House");
  house = JSON.parse(house);
  console.log(house);
  let picUrls = house.pics[0];
  console.log(house.pics[0]);

  let ownerId = house.owner_id;
  let owner = await getOwner(ownerId);
  owner = owner[0];
  let owner_name = owner.firstname + " " + owner.lastname;
  document.querySelector("#houseDesc").textContent = house.house_description
    .split(" ")
    .splice(0, 6)
    .join(" "); //Take the# first four words from the house description

  document.querySelector(".detail-container #description").textContent =
    house.house_description;
  document.querySelector(".detail-container #location").textContent =
    house.location;
  document.querySelector(".detail-container #tag").textContent =
    house.house_tag;
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
    "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/uploads/img/houses/" +
    picUrls[0]?.photo_url;
  console.log(
    "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/uploads/img/houses/" +
      picUrls[0]?.photo_url
  );

  document.querySelector(".property-div h1").textContent += " " + owner_name;

  //Filling the form for editing the house
  document.querySelector(
    ".modal #house_tag #" + house.house_tag
  ).selected = true;
  document.querySelector(".modal #desc").value = house.house_description;
  document.querySelector(".modal #location").value = house.location;
  document.querySelector(".modal #price").value = house.price;
  document.querySelector(".modal #no_rooms_input").value = house.no_rooms;
  document.querySelector(".modal #bed_rooms_input").value = house.bed_rooms;
  document.querySelector(".modal #bath_rooms_input").value = house.bath_rooms;

  searchAndLoad(3, ownerId);
};

loadInformation();
