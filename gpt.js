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
                        window.location.href = "result-gpt.html?" + queryParams.slice(0, -1);
                    } else {
                        window.location.href = "result-gpt.html?text=" + encodeURIComponent(matchingResult);
                    }
                }
            } else {
                
                const answers = ["Lorem ipsum dolor sit amet", "Ut enim ad minim veniam", "Duis aute irure dolor in reprehenderit", "Excepteur sint occaecat cupidatat"]
                const randomAnswer = answers[Math.floor(Math.random()*answers.length)]
                document.getElementById('loader').style.display = 'block'
                document.getElementById('myBtn').style.display = 'none'
                setTimeout(function() { 
                    document.getElementById('loader').style.display = 'none'
                    document.getElementById('myBtn').style.display = 'block'
                    var chat = document.getElementById("chat");
                    chat.innerHTML = '<p style="text-align: right; margin-bottom: 7px; color: #BFE3D6;">' + randomAnswer + '</p>' + chat.innerHTML;
                    chat.innerHTML = '<p style="text-align: left; margin-bottom: 5px; color: #FFFFFF;">' + enteredCode + '</p>' + chat.innerHTML;
           
                }, 1000)
                // var chat = document.getElementById("chat");
                // chat.innerHTML = '<p style="text-align: right; margin-bottom: 7px; color: #BFE3D6;">' + randomAnswer + '</p>' + chat.innerHTML;
                // chat.innerHTML = '<p style="text-align: left; margin-bottom: 5px; color: #FFFFFF;">' + enteredCode + '</p>' + chat.innerHTML;
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

function showText() {
    var inputText = document.getElementById("codeInput").value;
    var resultDiv = document.getElementById("result");
    resultDiv.innerText = "Wprowadzony tekst: " + inputText;
}
