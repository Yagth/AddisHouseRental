import { postData } from "./common.js";
import { getCookie } from "./cookie.js";
let roomsI = document.getElementById("no_rooms");
let bedRoomsI = document.getElementById("bed_rooms");
let bathRoomsI = document.getElementById("bath_rooms");
let houseTag = document.getElementsByName("house_tag")[0];
let price = document.getElementsByName("price")[0];
let location = document.getElementsByName("location")[0];
let form = document.getElementsByTagName("form")[0];
let submit = document.querySelector(".cbtn");
let errorHeader = document.getElementById("error_header");

const houseTagChange = () => {
  switch (houseTag.value) {
    case "Home":
    case "Apartment":
    case "Building":
      roomsI.classList.add("hidden");
      roomsI.required = false;
      bedRoomsI.classList.remove("hidden");
      bedRoomsI.required = true;
      bathRoomsI.classList.remove("hidden");
      bathRoomsI.required = true;

      break;
    default:
      roomsI.classList.remove("hidden");
      roomsI.required = true;
      bedRoomsI.classList.add("hidden");
      bathRoomsI.classList.add("hidden");
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
  } else if (!locationP.test(location.value)) {
    return { error: true, message: "Wrong location input." };
  } else if (!form.checkValidity()) {
    return { error: true, message: "Invalid or missing input" };
  } else {
    return { error: false };
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
submit.addEventListener("click", async (event) => {
  // console.log("Preventing post");
  let validForm = validateForm();
  let res;
  errorHeader.classList.remove("hidden");
  if (!validForm.error) {
    let formData = new FormData(form);
    let userId = getCookie("User");
    userId = JSON.parse(userId);
    userId = userId.id;
    formData.append("owner_id", userId);
    res = await postData(
      "http://localhost:8080/PHP/AddisHouseRental/Backend/api/house/create_house.php",
      formData
    );
    res = JSON.parse(res);

    // for (var entry of formData.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }
    console.log(res);

    errorHeader.style.backgroundColor = res.success ? "green" : "red";
    errorHeader.innerHTML = res.success
      ? "House created successfully"
      : res.message
      ? res.message
      : res.error;
    form.reset();
  } else {
    errorHeader.style.backgroundColor = validForm.error ? "red" : "green";
    errorHeader.innerHTML = validForm.message;
  }
});
//Adding action listener
houseTag.onchange = houseTagChange;
