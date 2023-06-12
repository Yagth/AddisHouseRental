import { getCookie } from "./cookie.js";
import { saveCookie } from "./common.js";

const submitData = async () => {
  try {
    let form = document.getElementById("login");
    let errorHeader = document.getElementById("error_header");
    const formData = new FormData(form);

    const res = await fetch(
      "http://localhost:8080/PHP/AddisHouseRental/Backend/api/auth/login.php",
      {
        method: "post",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.loggedin) {
      errorHeader.textContent = "Login successful";
      errorHeader.style.backgroundColor = "green";
      saveCookie("User", data.data);
      setTimeout(() => {
        window.location.href =
          "http://127.0.0.1:5500/Frontend/pages/home_page.html";
      }, 1500);
    } else {
      errorHeader.textContent = data.error;
      errorHeader.style.backgroundColor = "red";
    }
  } catch (error) {
    console.log("error" + error.message);
  }
};

let user = getCookie("User");
let submit = document.getElementById("submit");
submit.addEventListener("click", submitData);

if (user !== "") {
  user = JSON.parse(user);
  let emailField = document.getElementById("email");
  emailField.value = user.email;
}
