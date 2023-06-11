let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  let form = document.getElementById("signup");
  fetch(
    "http://localhost:8080/PHP/AddisHouseRental/Backend/api/auth/signup.php",
    {
      method: "post",
      body: form,
    }
  )
    .then((res) => {
      console.log("fetched data");
      console.log(res);
    })
    .catch((err) => {
      console.log("Found error", err);
    });
});
