function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  var image = getParameterByName('image');
  var video = getParameterByName('video');
  var text = getParameterByName('text');
  
  if (image) {
    document.getElementById("result").innerHTML = "<img src='" + image + "' alt='Zdjęcie'>";
  } else if (video) {
    document.getElementById("result").innerHTML = "<video controls><source src='" + video + "' type='video/mp4'></video>";
  } else if (text) {
    document.getElementById("result").innerHTML = text;
    document.getElementById("result").classList.add("text"); 
  } else {
    document.getElementById("result").innerHTML = "";
  }
  
  displayResults(); 
  
  
  function displayResults() {
    var imagesParam = getParameterByName('images');
    var videosParam = getParameterByName('videos');
    var textParam = getParameterByName('text');
  
    if (imagesParam) {
      var images = JSON.parse(decodeURIComponent(imagesParam));
      images.forEach(function(image) {
        var imgElement = document.createElement('img');
        imgElement.src = image;
        document.getElementById('result').appendChild(imgElement);
      });
    }
  
    if (videosParam) {
      var videos = JSON.parse(decodeURIComponent(videosParam));
      videos.forEach(function(video) {
        var videoElement = document.createElement('video');
        videoElement.controls = true;
        var sourceElement = document.createElement('source');
        sourceElement.src = video;
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement);
        document.getElementById('result').appendChild(videoElement);
      });
    }
  
    if (textParam) {
      document.getElementById('result').innerHTML = textParam;
    }
  }
  
function goBack() {
    window.location.href = "index.html";
  }