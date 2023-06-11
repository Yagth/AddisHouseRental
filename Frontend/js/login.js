import { getCookie } from "./cookie";

let user = getCookie("User");

if (user !== "") {
  user = JSON.parse(user);
  let emailField = document.getElementById("email");
  emailField.innerText = user.email;
}
