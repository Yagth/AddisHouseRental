let submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
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
      console.log(data.data);
    } else {
      errorHeader.textContent = data.error;
      console.log(data.error);
    }
  } catch (error) {
    console.log("error" + error.message);
  }
});
