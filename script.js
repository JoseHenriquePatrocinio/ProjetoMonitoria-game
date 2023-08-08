const jorge = document.querySelector("#jorge");
const inimigo = document.querySelector("#inimigo");
const ponte1 = document.querySelector(".ponte1");
const ponte2 = document.querySelector(".ponte2");
const vidaImagem = document.querySelector("#vida");
let vidaValor = 100;

const mensagensInformativasPossiveis = [
    `
    Você sabia que o tabagismo é a maior causa de morte evitável do mundo?
    Além de doenças respiratórias, o tabagismo causa impotência, infertilidade e úlcera.
    O tabagismo pode causar cânceres de boca, faringe e laringe.
    `,
    `
    O Brasil está no 8º lugar dos países que mais fumam. Você faz parte disso!
    Fumar encurta 11 anos de sua vida. 
    Após deixar o cigarro, o seu coração volta ao normal após  15 anos.
    `,
];

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
    jorge.classList.remove("hide");
    inimigo.classList.remove("hide");
    vidaImagem.classList.remove("hide");
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

function diminuirVida(valor) {
    vidaValor -= valor;
    if (vidaValor < 0) {
        vidaValor = 0;
    }
    const vidaAtual = document.querySelector(".vida-atual");
    vidaAtual.style.width = `${vidaValor}%`;
}

function inimigoEncostou(inimigoPosition, jorgePosition) {
    return inimigoPosition < 70 && inimigoPosition > 0 && jorgePosition < 70;
}

function trocarImagemInimigo() {
    inimigo.src =
        inimigosPosiveis[Math.floor(Math.random() * inimigosPosiveis.length)];
}

function jorgeMorreu() {
    return vidaValor <= 0;
}

function setMorteJorge(inimigoPosition, jorgePosition, ponte1Position, ponte2Position) {
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
}

function inimigoSaiuDaTela(inimigoPosition){
    const pixelLimite = -80;
    return inimigoPosition < pixelLimite;
}

function resetarAnimacaoInimigo(){
    inimigo.classList.add("hide");
    trocarImagemInimigo();
    setTimeout(() => {
        inimigo.classList.remove("hide");
    }, 1000);
    
}

function obterMensagemInformativaAleatoria(){
    return mensagensInformativasPossiveis[Math.floor(Math.random() * mensagensInformativasPossiveis.length)];
}

function exibirPopUpMsgAleatoria(msg){
    Swal.fire(msg);
}

const loop = setInterval(() => {
    const inimigoPosition = inimigo.offsetLeft;
    const ponte1Position = ponte1.offsetLeft;
    const ponte2Position = ponte2.offsetLeft;
    const jorgePosition = parseFloat(
        window.getComputedStyle(jorge).bottom.replace("px", "")
    );

    if (inimigoEncostou(inimigoPosition, jorgePosition)) {
        diminuirVida(35);

        if (jorgeMorreu()) {
            exibirPopUpMsgAleatoria(obterMensagemInformativaAleatoria());
            setMorteJorge(inimigoPosition, jorgePosition, ponte1Position, ponte2Position);
            clearInterval(loop);
        } else {
            resetarAnimacaoInimigo();
        }
    }

    if (inimigoSaiuDaTela(inimigoPosition)) {
        trocarImagemInimigo();
    }
}, 10);

document.addEventListener("click", jump);
document.addEventListener("keydown", jump);

setTimeout(removeImages, 7500);
