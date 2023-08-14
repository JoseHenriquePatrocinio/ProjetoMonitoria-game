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

const imagensJorgeCaminhando = [
    "/imgs/movimento/estagio1caminhando.gif",
    "/imgs/movimento/estagio2caminhando.gif",
    "/imgs/movimento/estagio3caminhando.gif"
];

const imagensJorgePulando = [
    "/imgs/pulo/estagio1pulando.gif",
    "/imgs/pulo/estagio2pulando.gif",
    "/imgs/pulo/estagio3pulando.gif"
];

const jump = () => {
    jorge.classList.add("jump");
    let jorgeImg = jorge.src;

    if (vidaValor >= 66) {
        jorge.src = imagensJorgePulando[0];
    } else if (vidaValor < 66 && vidaValor >= 33) {
        jorge.src = imagensJorgePulando[1];
    }
    else if (vidaValor < 33) {
        jorge.src = imagensJorgePulando[2];
    }

    setTimeout(() => {
        jorge.src = jorgeImg;
        jorge.classList.remove("jump");
    }, 900);
   
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

function alterarImagemJorge() {
    if (vidaValor >= 66) {
        jorge.src = imagensJorgeCaminhando[0];
    } else if (vidaValor < 66 && vidaValor >= 33) {
        jorge.src = imagensJorgeCaminhando[1];
    }
    else if (vidaValor < 33) {
        jorge.src = imagensJorgeCaminhando[2];
    }
}

function diminuirVida(valor) {
    vidaValor -= valor;
    if (vidaValor < 0) {
        vidaValor = 0;
    }
    const vidaAtual = document.querySelector(".vida-atual");
    vidaAtual.style.width = `${vidaValor}%`;
    console.log(vidaValor);
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
        alterarImagemJorge();

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
