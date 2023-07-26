setTimeout(function() {
  const inimigoElement = document.getElementById('inimigo');
  const jorgeElement = document.getElementById("jorge");

  jorgeElement.classList.remove('hide');
  inimigoElement.classList.remove('hide');
}, 7500);

function removeImages() {
  var backgroundImg = document.getElementById('backgroundId');
  var loadImg = document.getElementById('loadId');

  if (backgroundImg) {
    backgroundImg.parentNode.removeChild(backgroundImg);
  }

  if (loadImg) {
    loadImg.parentNode.removeChild(loadImg);
  }
}

setTimeout(removeImages, 7500);