const jorge = document.querySelector(".jorge");
const inimigo = document.querySelector(".inimigo");
const ponte1 = document.querySelector(".ponte1");
const ponte2 = document.querySelector(".ponte2");

const jump = () => {
  jorge.classList.add("jump");
  
  setTimeout(() => {
    jorge.classList.remove("jump");
  }, 800);
};

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

const loop = setInterval(() => {
  const inimigoPosition = inimigo.offsetLeft;
  const ponte1Position = ponte1.offsetLeft;
  const ponte2Position = ponte2.offsetLeft;
  const jorgePosition = window.getComputedStyle(jorge).bottom.replace("px", "");

  if (inimigoPosition < 70 && inimigoPosition > 0 && jorgePosition < 70) {
    
    inimigo.style.animation = "none";
    inimigo.style.left = `${inimigoPosition}px`;

    ponte1.style.animation = "none";
    ponte1.style.left = `${ponte1Position}px`;

    ponte2.style.animation = "none";
    ponte2.style.left = `${ponte2Position}px`;

    jorge.style.animation = "none";
    jorge.style.bottom = `${jorgePosition}px`;

    jorge.src = "/imgs/dano/morto.gif";
    jorge.style.width = "150px";
    jorge.style.marginLeft = "10px";
    clearInterval(loop);
  }    
}, 10);




document.addEventListener("click", jump);
document.addEventListener("keydown", jump);

setTimeout(removeImages, 7500);