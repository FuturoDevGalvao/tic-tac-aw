const celulas = document.querySelectorAll(".cell");

const slider = document.querySelector(".slider");

const xTurn = document.querySelector(".xTurn");
const oTurn = document.querySelector(".oTurn");

const cardVencedor = document.querySelector(".contain-victory");
const cardEmpate = document.querySelector(".contain-draw");

const btnReiniciar = document.querySelector(".btn-restart");
const vencedorNome = document.querySelector(".winning-player");

const xScore = document.getElementById("x-score");
const drawScore = document.getElementById("draw-score");
const oScore = document.getElementById("o-score");

const crownX = document.querySelector(".x-score img");
const crownO = document.querySelector(".o-score img");

const btnResetRound = document.getElementById("restart-round-button");
const btnResetScore = document.getElementById("restart-score-button");

let xScoreCount = 0,
  drawScoreCount = 0,
  oScoreCount = 0;

let jogadas = 9;
let vencedor = false;
let jogador = "";
let celulasBloqueadas = false,
  btnResetBloqueado = false;
const tabuleiro = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function incrementarPlacar(jogador) {
  switch (jogador) {
    case "X":
      xScoreCount++;
      xScore.textContent = xScoreCount;
      naFrente();
      break;
    case "O":
      oScoreCount++;
      oScore.textContent = oScoreCount;
      naFrente();
      break;
    default:
      drawScoreCount++;
      drawScore.textContent = drawScoreCount;
      break;
  }
}

function reiniciar() {
  tabuleiro.forEach((linha) => {
    linha.forEach((celula) => {
      celula.textContent = "";
    });
  });

  jogador = "";
  jogadas = 9;
  vencedor = false;
  celulasBloqueadas = false;
  btnResetBloqueado = false;
  slider.classList.remove("move-slider");
  xTurn.style.color = "aliceblue";
  oTurn.style.color = "#778da9";
  btnReiniciar.classList.add("btn-restart-draw-style");
}

function obterJogador() {
  if (jogadas % 2 == 0) {
    jogadas--;
    return "O";
  } else {
    jogadas--;
    return "X";
  }
}

function isChecarCelulaVazia(celula) {
  return celula.textContent != "X" && celula.textContent != "O";
}

function checarVencedor(tabuleiro) {
  const vitoriaX = isChecarX(tabuleiro);
  const vitoriaO = isChecarO(tabuleiro);

  if (vitoriaX) {
    vencedor = true;
    return "X";
  }

  if (vitoriaO) {
    vencedor = true;
    return "O";
  }
}

function isChecarX(tabuleiro) {
  const vitoriaHorizontalX =
    (tabuleiro[0][0].textContent == "X" &&
      tabuleiro[0][1].textContent == "X" &&
      tabuleiro[0][2].textContent == "X") ||
    (tabuleiro[1][0].textContent == "X" &&
      tabuleiro[1][1].textContent == "X" &&
      tabuleiro[1][2].textContent == "X") ||
    (tabuleiro[2][0].textContent == "X" &&
      tabuleiro[2][1].textContent == "X" &&
      tabuleiro[2][2].textContent == "X");

  const vitoriaVerticalX =
    (tabuleiro[0][0].textContent == "X" &&
      tabuleiro[1][0].textContent == "X" &&
      tabuleiro[2][0].textContent == "X") ||
    (tabuleiro[0][1].textContent == "X" &&
      tabuleiro[1][1].textContent == "X" &&
      tabuleiro[2][1].textContent == "X") ||
    (tabuleiro[0][2].textContent == "X" &&
      tabuleiro[1][2].textContent == "X" &&
      tabuleiro[2][2].textContent == "X");

  const vitoriaDiagonalX =
    (tabuleiro[0][0].textContent == "X" &&
      tabuleiro[1][1].textContent == "X" &&
      tabuleiro[2][2].textContent == "X") ||
    (tabuleiro[2][0].textContent == "X" &&
      tabuleiro[1][1].textContent == "X" &&
      tabuleiro[0][2].textContent == "X");

  if (vitoriaHorizontalX || vitoriaVerticalX || vitoriaDiagonalX) return true;
}

function isChecarO(tabuleiro) {
  const vitoriaHorizontalO =
    (tabuleiro[0][0].textContent == "O" &&
      tabuleiro[0][1].textContent == "O" &&
      tabuleiro[0][2].textContent == "O") ||
    (tabuleiro[1][0].textContent == "O" &&
      tabuleiro[1][1].textContent == "O" &&
      tabuleiro[1][2].textContent == "O") ||
    (tabuleiro[2][0].textContent == "O" &&
      tabuleiro[2][1].textContent == "O" &&
      tabuleiro[2][2].textContent == "O");

  const vitoriaVerticalO =
    (tabuleiro[0][0].textContent == "O" &&
      tabuleiro[1][0].textContent == "O" &&
      tabuleiro[2][0].textContent == "O") ||
    (tabuleiro[0][1].textContent == "O" &&
      tabuleiro[1][1].textContent == "O" &&
      tabuleiro[2][1].textContent == "O") ||
    (tabuleiro[0][2].textContent == "O" &&
      tabuleiro[1][2].textContent == "O" &&
      tabuleiro[2][2].textContent == "O");

  const vitoriaDiagonalO =
    (tabuleiro[0][0].textContent == "O" &&
      tabuleiro[1][1].textContent == "O" &&
      tabuleiro[2][2].textContent == "O") ||
    (tabuleiro[2][0].textContent == "O" &&
      tabuleiro[1][1].textContent == "O" &&
      tabuleiro[0][2].textContent == "O");

  if (vitoriaHorizontalO || vitoriaVerticalO || vitoriaDiagonalO) return true;
}

function estiloCelula(celula, jogador) {
  celula.classList.remove("x-player", "o-player");

  if (jogador == "X") {
    celula.classList.add("x-player");
  } else {
    celula.classList.add("o-player");
  }
}

function efetuarJogada(celula) {
  if (celulasBloqueadas) return;

  const celulaVazia = isChecarCelulaVazia(celula);

  if (celulaVazia) {
    jogador = obterJogador();

    estiloCelula(celula, jogador);
    vezDoJogador(jogador);

    celula.textContent = jogador;

    const jogadorVitorioso = checarVencedor(tabuleiro);
    conferirEmpate();
    conferirVitoria(jogadorVitorioso);
  }
}

function conferirEmpate() {
  if (!vencedor && jogadas == 0) {
    btnResetBloqueado = true;
    mostrarEmpate();
    estiloBotao("");
    incrementarPlacar("");
  }
}

function conferirVitoria(jogadorVitorioso) {
  if (vencedor) {
    btnResetBloqueado = true;
    mostrarVencedor(jogadorVitorioso);
    estiloBotao(jogadorVitorioso);
    incrementarPlacar(jogadorVitorioso);
  }
}

function adicionarListenerAsCelulas() {
  for (let linha = 0; linha < tabuleiro.length; linha++) {
    for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
      const celula = tabuleiro[linha][coluna];
      celula.addEventListener("click", () => {
        efetuarJogada(celula);
      });
    }
  }
}

function inicializarTabuleiro() {
  let celulaIndex = 0;

  for (let linha = 0; linha < tabuleiro.length; linha++) {
    for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
      tabuleiro[linha][coluna] = celulas[celulaIndex];
      celulaIndex++;
    }
  }
}

function mostrarVencedor(jogadorVitorioso) {
  celulasBloqueadas = true;

  vencedorNome.textContent = jogadorVitorioso;
  estiloJogador(jogadorVitorioso);

  cardVencedor.style.display = "flex";
  cardVencedor.classList.remove("contain-victory-hiden");
  cardVencedor.classList.add("contain-victory-show");
}

function mostrarEmpate() {
  celulasBloqueadas = true;
  cardEmpate.style.display = "flex";

  cardEmpate.classList.remove("contain-draw-hiden");
  cardEmpate.classList.add("contain-draw-show");
}

function vezDoJogador(jogador) {
  if (jogador == "X") {
    xTurn.style.color = "#778da9";
    oTurn.style.color = "aliceblue";
    slider.classList.add("move-slider");
  } else {
    oTurn.style.color = "#778da9";
    xTurn.style.color = "aliceblue";
    slider.classList.remove("move-slider");
  }
}

function estiloBotao(jogadorVitorioso) {
  if (jogadorVitorioso == "X") {
    btnReiniciar.classList.remove(
      "btn-restart-draw-style",
      "btn-restart-o-style"
    );
    btnReiniciar.classList.add("btn-restart-x-style");
  } else {
    btnReiniciar.classList.remove(
      "btn-restart-draw-style",
      "btn-restart-x-style"
    );
    btnReiniciar.classList.add("btn-restart-o-style");
  }
}

function estiloJogador(jogadorVitorioso) {
  if (jogadorVitorioso == "X") {
    vencedorNome.style.color = "#35c9dd";
  } else {
    vencedorNome.style.color = "#f000ff";
  }
}

function isJogoIniciado() {
  for (let linha = 0; linha < tabuleiro.length; linha++) {
    for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
      const celula = tabuleiro[linha][coluna];
      const jogoIniciado = !isChecarCelulaVazia(celula);
      if (jogoIniciado) return true;
    }
  }
}

function zerarPlacar() {
  reiniciar();
  xScore.textContent = 0;
  drawScore.textContent = 0;
  oScore.textContent = 0;
  xScoreCount = 0;
  drawScoreCount = 0;
  oScoreCount = 0;
  crownX.classList.remove("show-x-winning");
  crownO.classList.remove("show-o-winning");
}

function naFrente() {
  if (xScoreCount > oScoreCount) {
    crownO.classList.remove("show-o-winning");
    crownX.classList.add("show-x-winning");
  } else if (oScoreCount > xScoreCount) {
    crownX.classList.remove("show-x-winning");
    crownO.classList.add("show-o-winning");
  } else {
    crownO.classList.remove("show-o-winning");
    crownX.classList.remove("show-x-winning");
  }
}

document.getElementById("btn-restart-victory").addEventListener("click", () => {
  cardVencedor.classList.remove("contain-victory-show");
  cardVencedor.classList.add("contain-victory-hiden");

  cardVencedor.style.display = "none";

  reiniciar();
});

document.getElementById("btn-restart-draw").addEventListener("click", () => {
  cardEmpate.classList.remove("contain-draw-show");
  cardEmpate.classList.add("contain-draw-hiden");

  cardEmpate.style.display = "none";

  reiniciar();
});

btnResetRound.addEventListener("click", () => {
  if (btnResetBloqueado) return;

  if (isJogoIniciado()) {
    reiniciar();
    incrementarPlacar("");
  }
});

btnResetScore.addEventListener("click", () => {
  if (btnResetBloqueado) return;
  zerarPlacar();
});

window.onload = () => {
  inicializarTabuleiro();
  adicionarListenerAsCelulas();
};
