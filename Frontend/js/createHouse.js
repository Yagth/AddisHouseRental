let roomsI = document.getElementsByName("no_rooms")[0];
let bedRoomsI = document.getElementsByName("bed_rooms")[0];
let bathRoomsI = document.getElementsByName("bath_rooms")[0];
let houseTag = document.getElementsByName("house_tag")[0];

const houseTagChange = () => {
  switch (houseTag.value) {
    case "Home":
    case "Apartment":
    case "Building":
      roomsI.classList.add("hidden");
      bedRoomsI.classList.remove("hidden");
      bathRoomsI.classList.remove("hidden");
      console.log("Room hidden");
      break;
    default:
      roomsI.classList.remove("hidden");
      bedRoomsI.classList.add("hidden");
      bathRoomsI.classList.add("hidden");
      console.log("Room visible");
      break;
  }
};

//Adding action listener
houseTag.onchange = houseTagChange;
