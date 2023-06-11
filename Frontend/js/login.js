import { getCookie } from "./cookie.js";

let user = getCookie("User");

if (user !== "") {
  user = JSON.parse(user);
  let emailField = document.getElementById("email");
  emailField.value = user.email;
  console.log(user.email);
}
