forwardButton = document.getElementById("forward-button");
forwardButton.addEventListener("click", () => {
  img1 = document.getElementById("img1");
  img2 = document.getElementById("img2");
  img3 = document.getElementById("img3");
  console.log(img1.style.opacity);
  if (img1.style.opacity == "1") {
    img1.style.opacity = "0";
    img2.style.opacity = "1";
  } else if (img2.style.opacity == "1") {
    img2.style.opacity = "0";
    img3.style.opacity = "1";
  } else if (img3.style.opacity == "1") {
    img3.style.opacity = "0";
    img1.style.opacity = "1";
  }
});
