let button = $("#btn").on("click", function () {
  $("#modal").toggle(".flex");
});

$(".close, .modal").on("click", function () {
  $("#modal").css("display", "none");
});

$(".modal-content").on("click", function (event) {
  event.stopPropagation();
});
