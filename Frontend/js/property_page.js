import { saveCookie, shuffleArray, getData } from "./common.js";
import { deleteCookie, getCookie } from "./cookie.js";

let navbar = document.querySelector(".navbar");
let navButton = $(".navbar-login");
let apartmentB = $("#apartment");
let villaB = $("#villa");
let houseB = $("#house");

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
