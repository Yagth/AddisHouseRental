import { getCookie } from "./cookie.js";

const submitData = async () => {
  let password = document.getElementById("password");
  console.log(password.value);
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
    if (data.success) {
      errorHeader.textContent = "Signup successful";
      errorHeader.style.backgroundColor = "green";
      saveCookie("User", data.data);
      form.reset();
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
  console.log(user.email);
}
