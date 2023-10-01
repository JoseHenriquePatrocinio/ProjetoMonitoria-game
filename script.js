const jorge = document.querySelector("#jorge");
const inimigo = document.querySelector("#inimigo");
const ponte1 = document.querySelector(".ponte1");
const ponte2 = document.querySelector(".ponte2");
const vidaImagem = document.querySelector("#vida");
const pontuacao = document.querySelector("#pontuacaoValor");

var timeoutID;

let contagemInimigos = 0;

let vidaValor = 100;

let nicotinaTotal = 0;

let lastJumpTime = 0;

let animationDuration = 3;

let pontuacaoTotal = 0;

const pontosPorSegundo = 50;

const mensagensInformativasPossiveis = [
    `Você sabia que o tabagismo é a maior causa de morte evitável do mundo?`,
    `Além de doenças respiratórias, o tabagismo causa impotência, infertilidade e úlcera. `,
    `O tabagismo pode causar cânceres de boca, faringe e laringe.`,
    `O Brasil está no 8º lugar dos países que mais fumam. Você faz parte disso!`,
    `Fumar encurta 11 anos de sua vida.`,
    `Após deixar o cigarro, o seu coração volta ao normal após 15 anos.`,
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

const imagensJorgeDano = [
    "/imgs/dano/estagio1dano.gif",
    "/imgs/dano/estagio2dano.gif",
    "/imgs/dano/estagio3dano.gif"
];

const jump = () => {
    const currentTime = Date.now();
    
    if (currentTime - lastJumpTime >= 1000) { 
        lastJumpTime = currentTime;

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
    }
};

function aumentarPontuacao() {
    if (!jorgeMorreu()) {
        pontuacaoTotal += pontosPorSegundo;
        const pontuacaoElement = document.getElementById("pontuacaoValor");
        pontuacaoElement.textContent = pontuacaoTotal;
    }
}

setTimeout(() => {
    setInterval(aumentarPontuacao, 1000); // Aumenta a pontuação a cada 1 segundo (1000ms)
}, 7500);

function restartPage(){
    location.reload();
}

setTimeout(function () {
    jorge.classList.remove("hide");
    inimigo.classList.remove("hide");
    vidaImagem.classList.remove("hide");
    pontuacao.classList.remove("hide");
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
        jorge.src = imagensJorgeDano[0];
        setTimeout(function() {
            jorge.src = imagensJorgeCaminhando[0];
        }, 500);
    } else if (vidaValor < 66 && vidaValor >= 33) {
        jorge.src = imagensJorgeDano[1];
        setTimeout(function() {
            jorge.src = imagensJorgeCaminhando[1];
        }, 500);
    } else if (vidaValor < 33) {
        jorge.src = imagensJorgeDano[2];
       timeoutID = setTimeout(function() {
            jorge.src = imagensJorgeCaminhando[2];
        }, 500);
    }
}


function getDanoInimigo(){
    let dano = 0;

    if(inimigo.src.includes("cigarro")){
        dano = 10;
    }else if(inimigo.src.includes("vape")){
        dano = 20;
    }else if(inimigo.src.includes("narguile")){
        dano = 40;
    }
   
    return dano;
}

function diminuirVida() {
    let dano = getDanoInimigo();
    console.log(dano)

    vidaValor -= dano;
  
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
    inimigo.style.animation = "none";
    inimigo.style.left = `${inimigoPosition}px`;

    ponte1.style.animation = "none";
    ponte1.style.left = `${ponte1Position}px`;

    ponte2.style.animation = "none";
    ponte2.style.left = `${ponte2Position}px`;

    jorge.style.animation = "none";
    jorge.style.bottom = `${jorgePosition}px`;

    jorge.src = "/imgs/dano/morto.gif";
    jorge.style.width = "190px";
    jorge.style.marginLeft = "10px";
}

function inimigoSaiuDaTela(inimigoPosition){
    const pixelLimite = -80;
    return inimigoPosition <= pixelLimite && inimigoPosition >= pixelLimite - 8;
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

function exibirPopUpMsg(msg){
    Swal.fire({
        title: "Você Sabia?",
        text: msg,
        icon: "question",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000"
    });
}

function getMensagemMorte(){
    const msg = `Parabéns, você virou estatística! Mais uma morte para a indústria do tabaco.
    Quantidade de nicotina consumida: ${nicotinaTotal}mg`;
    return msg;
}

function exibirPopUpMorte(){
    let titulo = `Você morreu! Pontuação total: ${pontuacaoTotal}`;
    const msg = getMensagemMorte();
    Swal.fire({
        title: titulo,
        text: msg,
        icon: "error",
        confirmButtonText: "Recomeçar",
        confirmButtonColor: "#ff0000"
    }).then((result) => {
        if(result.isConfirmed){
            restartPage();
        }
    });
}

function validaExibirMsgInformativa(){
    if(contagemInimigos % 8 == 0){
        console.log("exibir msg informativa");
        updateDificuldade();
        inimigo.classList.add("hide");
        let a = exibirPopUpMsg(obterMensagemInformativaAleatoria());
        setTimeout(() => {
            try{
                document.querySelector(".swal2-confirm").click();
            }catch(e){}

            setTimeout(() => {
                inimigo.classList.remove("hide")
            }, 1000);
        }, 5000);
    }
}

function incrementarNicotina(){
    let nicotina = 0;

    if(inimigo.src.includes("cigarro")){
        nicotina = 1;
    }else if(inimigo.src.includes("vape")){
        nicotina = 55;
    }else if(inimigo.src.includes("narguile")){
        nicotina = 100;
    }
   
    nicotinaTotal += nicotina;
}


const loop = setInterval(() => {

    const inimigoPosition = inimigo.offsetLeft;
    const ponte1Position = ponte1.offsetLeft;
    const ponte2Position = ponte2.offsetLeft;
    const jorgePosition = parseFloat(
        window.getComputedStyle(jorge).bottom.replace("px", "")
    );

    if (inimigoEncostou(inimigoPosition, jorgePosition)){
        diminuirVida();
        alterarImagemJorge();   
        incrementarNicotina();
    
        if (jorgeMorreu()) {
            clearTimeout(timeoutID);
            exibirPopUpMorte();
            setMorteJorge(inimigoPosition, jorgePosition, ponte1Position, ponte2Position);
            clearInterval(loop);
        } else {
            resetarAnimacaoInimigo();
        }
    }

    if (inimigoSaiuDaTela(inimigoPosition)) {
        console.log("inimigo Saiu Da Tela");
        validaExibirMsgInformativa();
        contagemInimigos++;
        trocarImagemInimigo();
    }
}, 10);

function updateDificuldade() {

    if (animationDuration > 1.3) {
        animationDuration -= 0.3;
    }  
if (animationDuration < 1.3){
        animationDuration = 1.3; 
    }

    if (pontuacaoTotal >= 6000){
        animationDuration = 1.0; 
    }

    inimigo.style.animationDuration = `${animationDuration}s`;
}

document.addEventListener("click", jump);
document.addEventListener("keydown", jump);

setTimeout(removeImages, 7500);
