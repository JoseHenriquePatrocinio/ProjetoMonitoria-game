const jorge = document.querySelector("#jorge");
const inimigo = document.querySelector("#inimigo");
const ponte1 = document.querySelector(".ponte1");
const ponte2 = document.querySelector(".ponte2");
const vidaImagem = document.querySelector(".vida");
let vidaValor = 100;

const inimigosPosiveis = [
    "/imgs/inimigos/cigarro.gif",
    "/imgs/inimigos/narguile.gif",
    "/imgs/inimigos/vape.gif",
];

const jump = () => {
    jorge.classList.add("jump");

    setTimeout(() => {
        jorge.classList.remove("jump");
    }, 800);
};

setTimeout(function () {
    const inimigoElement = document.getElementById("inimigo");
    const jorgeElement = document.getElementById("jorge");

    jorgeElement.classList.remove("hide");
    inimigoElement.classList.remove("hide");
}, 7500);

function removeImages() {
    var backgroundImg = document.getElementById("backgroundId");
    var loadImg = document.getElementById("loadId");

    if (backgroundImg) {
        backgroundImg.parentNode.removeChild(backgroundImg);
    }

    if (loadImg) {
        loadImg.parentNode.removeChild(loadImg);
    }
}

function inimigoEncostou(inimigoPosition, jorgePosition) {
    return inimigoPosition < 70 && inimigoPosition > 0 && jorgePosition < 70;
}

function trocarImagemInimigo() {
    inimigo.src =
        inimigosPosiveis[Math.floor(Math.random() * inimigosPosiveis.length)];
}

function reiniciarAnimacaoInimigo() {
    //TODO onde paramos
    inimigo.classList.remove("inimigo-animation");
    inimigo.classList.add("inimigo-animation");
    console.log("chegous");
}

const loop = setInterval(() => {
    const inimigoPosition = inimigo.offsetLeft;
    const ponte1Position = ponte1.offsetLeft;
    const ponte2Position = ponte2.offsetLeft;
    const jorgePosition = window
        .getComputedStyle(jorge)
        .bottom.replace("px", "");

    // console.log(inimigoPosition);

    if (inimigoEncostou(inimigoPosition, jorgePosition)) {
        vidaValor = vidaValor - 49;
        reiniciarAnimacaoInimigo();
        trocarImagemInimigo();
        console.log(vidaValor);
        if (vidaValor <= 0) {
            console.log("morreu");
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
    }
    if (inimigoPosition < -80) {
        trocarImagemInimigo();
    }
}, 10);

document.addEventListener("click", jump);
document.addEventListener("keydown", jump);

setTimeout(removeImages, 7500);
