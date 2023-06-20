function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 8,
  });
}

function loadScript() {
  var script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRm3LGD9O_ZDgO8iZM4BM0NZjAEtKCqv0&callback=initMap";
  script.type = "text/javascript";
  document.head.appendChild(script);
}

window.onload = loadScript;
