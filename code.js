function checkCode() {
  var enteredCode = document.getElementById("codeInput").value;

  $.ajax({
    url: './data.json',
    dataType: 'json',
    success: function(data) {
      var matchingResult = null;

      for (var i = 0; i < data.length; i++) {
        if (enteredCode === data[i].code) {
          matchingResult = data[i].result;
          break;
        }
      }

      if (matchingResult) {
        // Sprawdź, czy wynik ma formę .html, jeśli tak, przekieruj na odpowiednią stronę
        if (matchingResult.endsWith(".html")) {
          window.location.href = matchingResult;
        } else {
          // Jeśli wynik nie ma formy .html, przekieruj na stronę "results.html" z przekazywanymi parametrami
          var resultArray = Array.isArray(matchingResult) ? matchingResult : [matchingResult];

          var images = [];
          var videos = [];

          resultArray.forEach(function(result) {
            if (result.endsWith(".jpg") || result.endsWith(".png") || result.endsWith(".gif")) {
              images.push(result);
            } else if (result.endsWith(".mp4")) {
              videos.push(result);
            }
          });

          var queryParams = "";

          if (images.length > 0) {
            queryParams += "images=" + encodeURIComponent(JSON.stringify(images)) + "&";
          }

          if (videos.length > 0) {
            queryParams += "videos=" + encodeURIComponent(JSON.stringify(videos)) + "&";
          }

          if (queryParams !== "") {
            window.location.href = "results.html?" + queryParams.slice(0, -1);
          } else {
            window.location.href = "results.html?text=" + encodeURIComponent(matchingResult);
          }
        }
      } else {
        $('#myModal').modal('show'); // Wyświetlanie modala Bootstrap
        document.getElementById("result").innerHTML = "";
      }
    },
    error: function(xhr, status, error) {
      console.error('Błąd podczas wczytywania pliku JSON:', error);
    }
  });
}

  
  var input = document.getElementById("codeInput");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("myBtn").click();
    }
  });
  

  function goform() {
    window.location.href = "form.html";
  }