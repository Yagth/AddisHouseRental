var toggleButton = document.querySelector(".menu-toggle");
var linksList = document.querySelector(".header_1 ul");

toggleButton.addEventListener("click", function () {
  toggleButton.classList.toggle("active");

  linksList.classList.toggle("active");

  if (linksList.classList.contains("active")) {
    toggleButton.appendChild(linksList);
  } else {
    document.querySelector(".header_1").appendChild(linksList);
  }

  var links = document.querySelectorAll(".header_1 ul li a");
  for (var i = 0; i < links.length; i++) {
    links[i].style.textDecoration = "none";
    links[i].style.color = " rgb(0%, 73%, 56%)";
  }

  linksList.style.listStyle = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  var searchBtn = document.querySelector(
    ".section1_forms button[type='submit']"
  );
  searchBtn.addEventListener("click", function () {
    searchBtn.classList.add("animate__animated", "animate__pulse");
    setTimeout(function () {
      searchBtn.classList.remove("animate__animated", "animate__pulse");
    }, 1000);
  });
});
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

const header = document.getElementById("main-header");
let lastScrollPosition = 0;

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition < lastScrollPosition) {
    header.style.bottom = "0";
  } else {
    header.style.bottom = "-100px";
  }

  lastScrollPosition = currentScrollPosition;
});
