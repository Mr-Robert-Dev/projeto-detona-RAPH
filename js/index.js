const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".inimigo"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    Values:{
        timeId: null,
        gameVelocidade: 1000,
        posicao: 0,
        resultado:0,
        tempo:10,
        contadortempo: setInterval(tempo, 1000)
    },
};

function tempo(){
    state.Values.tempo--;
    state.view.timeLeft.textContent = state.Values.tempo;
    if(state.Values.tempo <= 0){
        alert("Fim de jogo, sua pontuação foi "+ state.Values.resultado + " pontos")
        state.Values.tempo = 10
        state.Values.resultado = 0
        state.view.score.textContent = 0 ;
    }
}

function audios(){
    let audio = new Audio ("./audios/hit.m4a")
    audio.volume =0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("inimigo");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let selectedSquare = state.view.squares[randomNumber];
    selectedSquare.classList.add("inimigo");
    state.Values.posicao = selectedSquare.id;
}
 function moverInimigo(){
    state.Values.timeId = setInterval(randomSquare,state.Values.gameVelocidade)
 }

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("click", ( ) =>{
        if(square.id === state.Values.posicao){
            state.Values.resultado++;
            state.view.score.textContent = state.Values.resultado;
            state.Values.posicao = null;
            audios()
        }
        } )
    })
}

function inicio(){
    moverInimigo();
    addListenerHitBox();
}

inicio();