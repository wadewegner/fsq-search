$(document).ready(function () {
  var $submitBtn = $(".btn[type='submit']");
  var $buttonSpan = $("#button-span");

  $("#searchForm").on("submit", function (event) {
    event.preventDefault();
    var searchVal = $("#searchBar").val();

    // Disable the button and show loading text
    $submitBtn.attr("disabled", true);
    $buttonSpan.text("Loading...");

    $.ajax({
      method: "POST",
      url: "/api",
      contentType: "application/json",
      data: JSON.stringify({ question: searchVal }),
      success: function (data) {
        // Enable the button and show submit text
        $submitBtn.removeAttr("disabled");
        $buttonSpan.text("Submit");

        let converter = new showdown.Converter();
        let searchItemText =
          '<p class="card-text">You searched for: ' + searchVal + "</p>";
        let searchText = '<div class="card-body">' + searchItemText + "</div>";

        let responseHTML = converter.makeHtml(data.response);
        let resultText =
          '<h5 class="card-title">You asked: ' + searchVal + "</h5>";

        let linksHTML = "<ul>";
        for (let i = 0; i < data.links.length; i++) {
          linksHTML +=
            '<li><a href="' +
            data.links[i] +
            '" target="_blank">' +
            data.links[i] +
            "</a></li>";
        }
        linksHTML += "</ul>";

        let result =
          '<div class="card-body">' +
          resultText +
          responseHTML +
          linksHTML +
          "</div>";

        let card = '<div class="card mt-4">' + result + "</div>";
        $("#results").prepend(card);
        $("#searchBar").val("");
      },
      error: function (error) {
        console.error(error);

        // Enable the button and show submit text
        $submitBtn.removeAttr("disabled");
        $buttonSpan.text("Submit");
      },
    });
  });
});
