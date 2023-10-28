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

let xScoreCount = 0,
  drawScoreCount = 0,
  oScoreCount = 0;

let jogadas = 9;
let vencedor = false;
let jogador = "";
let bloquearCelulas = false;
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
      break;
    case "O":
      oScoreCount++;
      oScore.textContent = oScoreCount;
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
  bloquearCelulas = false;
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

function isChecarVencedor(tabuleiro) {
  const vitoriaX = checarX(tabuleiro);
  const vitoriaO = checarO(tabuleiro);

  if (vitoriaX) {
    vencedor = true;
    return "X";
  }

  if (vitoriaO) {
    vencedor = true;
    return "O";
  }
}

function checarX(tabuleiro) {
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

function checarO(tabuleiro) {
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

  if (jogador == "O") celula.classList.add("o-player");

  if (jogador == "X") celula.classList.add("x-player");
}

function efetuarJogada(celula) {
  if (bloquearCelulas) return;

  const celulaVazia = isChecarCelulaVazia(celula);

  if (celulaVazia) {
    jogador = obterJogador();

    estiloCelula(celula, jogador);
    vezDoJogador(jogador);
    celula.textContent = jogador;

    const jogadorVitorioso = isChecarVencedor(tabuleiro);

    if (vencedor == false && jogadas == 0) {
      mostrarEmpate();
      estiloBotao(""); // Defina a variável jogadorVitorioso como vazia
      incrementarPlacar("");
      return;
    }

    if (vencedor) {
      mostrarVencedor(jogadorVitorioso);
      estiloBotao(jogadorVitorioso);
      incrementarPlacar(jogadorVitorioso);
      return;
    }
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
  bloquearCelulas = true;

  vencedorNome.textContent = jogadorVitorioso;
  estiloJogador(jogadorVitorioso);

  cardVencedor.style.display = "flex";
  cardVencedor.classList.remove("contain-victory-hiden");
  cardVencedor.classList.add("contain-victory-show");
}

function mostrarEmpate() {
  bloquearCelulas = true;
  cardEmpate.style.display = "flex";

  cardEmpate.classList.remove("contain-draw-hiden");
  cardEmpate.classList.add("contain-draw-show");
}

function vezDoJogador(jogador) {
  if (jogador == "X") {
    xTurn.style.color = "#778da9";
    oTurn.style.color = "aliceblue";
    slider.classList.add("move-slider"); // Adicione a classe quando o jogador for "X"
  } else {
    oTurn.style.color = "#778da9";
    xTurn.style.color = "aliceblue";
    slider.classList.remove("move-slider"); // Remova a classe quando o jogador for "O"
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

window.onload = () => {
  inicializarTabuleiro();
  adicionarListenerAsCelulas();
};
