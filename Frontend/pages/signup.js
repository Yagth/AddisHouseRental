let submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  try {
    let form = document.getElementById("signup");
    const formData = new FormData(form);
    const res = await fetch(
      "http://localhost:8080/PHP/AddisHouseRental/Backend/api/auth/signup.php",
      {
        method: "post",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("error" + error.message);
  }
});
