import { saveCookie } from "./common.js";
const submitData = async () => {
  let errorHeader = document.getElementById("error_header");

  try {
    let form = document.getElementById("signup");
    if (!form.checkValidity()) {
      errorHeader.textContent = "Please make sure to insert valid values first";
      errorHeader.style.backgroundColor = "red";
      return;
    }
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

let submit = document.getElementById("submit");
submit.addEventListener("click", submitData);
