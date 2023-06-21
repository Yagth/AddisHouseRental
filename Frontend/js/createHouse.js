import { postData } from "./common.js";
import { getCookie } from "./cookie.js";
let roomsI = document.getElementById("no_rooms");
let bedRoomsI = document.getElementById("bed_rooms");
let bathRoomsI = document.getElementById("bath_rooms");
let roomsJ = $("#no_rooms");
let bedRoomsJ = $("#bed_rooms");
let bathRoomsJ = $("#bath_rooms");
let form = $("#addHouse");
let houseTag = document.getElementsByName("house_tag")[0];
let price = document.getElementsByName("price")[0];
let locationT = document.getElementsByName("location")[0];
let errorHeader = document.getElementById("error_header");

const houseTagChange = () => {
  switch (houseTag.value) {
    case "Home":
    case "Apartment":
    case "Building":
      roomsJ.hide();
      roomsI.required = false;
      bedRoomsJ.show();
      bathRoomsJ.show();
      bedRoomsI.required = true;
      bathRoomsI.required = true;

      break;
    default:
      roomsJ.show();
      roomsI.required = true;
      bedRoomsJ.hide();
      bathRoomsJ.hide();
      bedRoomsI.required = false;
      bathRoomsI.required = false;

      break;
  }
};

const validateForm = () => {
  //Regex patterns
  const priceP = /^[0-9]+(\.[0-9]{1,2})?$/;
  const locationP = /^[a-zA-Z0-9 |]+$/;
  if (!priceP.test(price.value)) {
    return { error: true, message: "Price should be in floats" };
  } else if (!locationP.test(locationT.value)) {
    return { error: true, message: "Wrong location input." };
  } else if (!document.querySelector("#addHouse").checkValidity()) {
    return { error: true, message: "Invalid or missing input" };
  } else {
    return { error: false };
  }
};

form.submit(async (event) => {
  event.preventDefault();

  let validForm = validateForm();
  let res;
  if (!validForm.error) {
    let formData = new FormData(document.querySelector("#addHouse"));
    let userId = getCookie("User");
    userId = JSON.parse(userId);
    userId = userId.id;
    formData.append("owner_id", userId);
    res = await postData(
      "http://192.168.43.61//PHP/AddisHouseRental/Backend/api/house/create_house.php",
      formData
    );
    // for (var entry of formData.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }
    console.log(res);
    errorHeader.style.backgroundColor = res.success ? "green" : "red";
    errorHeader.innerHTML = res.success
      ? "House Created successfully"
      : res.message;
  } else {
    errorHeader.style.backgroundColor = validForm.error ? "red" : "green";
    errorHeader.innerHTML = validForm.message;
  }
  return false;
});
//Adding action listener
roomsJ.hide();
roomsI.required = false;
houseTag.addEventListener("change", houseTagChange);
