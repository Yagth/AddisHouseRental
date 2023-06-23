import { getCookie } from "./cookie.js";
import { postData, saveCookie } from "./common.js";

let emailField = document.querySelector("#email");

const submitData = async () => {
  try {
    let form = document.getElementById("login");
    let errorHeader = document.getElementById("error_header");

    if (!form.checkValidity()) {
      errorHeader.textContent = "Please insert valid values first";
      errorHeader.style.backgroundColor = "red";
      return;
    }
    const formData = new FormData(form);
    const res = await fetch(
      "http://127.0.0.1:8080/PHP/AddisHouseRental/Backend/api/auth/login.php",
      {
        method: "post",
        body: formData,
      }
    );
    // const emailP = "/^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]{2,7}$/";

    const data = await res.json();
    if (data.loggedin) {
      errorHeader.textContent = "Login successful";
      errorHeader.style.backgroundColor = "green";
      saveCookie("User", data.data);
      setTimeout(() => {
        window.location.href =
          "http://127.0.0.1:8080/PHP/AddisHouseRental/Frontend/pages/home_page.html";
      }, 1500);
    } else {
      errorHeader.textContent = data.error;
      errorHeader.style.backgroundColor = "red";
    }
  } catch (error) {
    console.log("error" + error.message);
  }
};

let email = getCookie("email");
let submit = document.getElementById("submit");
submit.addEventListener("click", submitData);

if (email !== "") {
  emailField.value = email;
}
