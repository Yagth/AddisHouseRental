// Get the form and form elements
const searchForm = document.querySelector(".formm");
const searchInput = document.querySelector("#search");
const propertyTypeSelect = document.querySelector("#property_type");
const priceInput = document.querySelector("#price");
const searchButton = document.querySelector("#searchSumbit");

// Function to show a success message popup
function showSuccessMessage() {
  alert("U have submitted successfully My coder😘😍");
}

// Function to show an error message and highlight the empty fields in red
function showErrorMessage() {
  alert("Fill again 😡😡");
  if (searchInput.value === "") {
    searchInput.style.border = "2px solid red";
  }
  if (propertyTypeSelect.value === "") {
    propertyTypeSelect.style.border = "2px solid red";
  }
  if (priceInput.value === "") {
    priceInput.style.border = "2px solid red";
  }
}

// Function to handle the form submission
function handleSearchSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Check how many form elements are filled
  let filledCount = 0;
  if (searchInput.value !== "") {
    filledCount++;
  }
  if (priceInput.value !== "") {
    filledCount++;
  }
  if (propertyTypeSelect.value !== "") {
    filledCount++;
  }

  // Show success message if only one or three fields are filled, and the selected option is not empty
  if (filledCount === 1 || filledCount === 3) {
    showSuccessMessage();
  } else {
    // Otherwise show error message and highlight empty fields in red
    showErrorMessage();
  }
}

// Add event listener to the search button
searchButton.addEventListener("click", handleSearchSubmit);
