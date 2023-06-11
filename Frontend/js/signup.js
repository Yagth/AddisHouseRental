import { setCookie } from "./cookie.js";

const submitData = async () => {
  try {
    let form = document.getElementById("signup");
    let errorHeader = document.getElementById("error_header");
    const formData = new FormData(form);
    const res = await fetch(
      "http://localhost:8080/PHP/AddisHouseRental/Backend/api/auth/signup.php",
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

const saveCookie = (name, jsonData) => {
  const stringData = JSON.stringify(jsonData);
  setCookie(name, stringData, 1);
};

let submit = document.getElementById("submit");
submit.addEventListener("click", submitData);
