$(document).ready(function () {
  $(".start").on("click", startGame);
});

function startGame() {
  console.log("Juego iniciado");

  let gameBoard = $(".gameBoard");
  let bloque = $(".bloque");
  let container = $(".container");
  let scoreValue = $(".scoreValue");
  let gameOverScreen = $(".gameOver");

  container.css("display", "flex");
  $(".startGame").css("display", "none");
  $(".score").css("display", "block");

  spawnbloque();

  let clicks = 0;
  let segundos = 0;
  let centesimas = 0;
  var temporizadorSegundos = null;
  var temporizadorCentesimas = null;
  scoreValue.text(0);
  bloque.on("click", () => {
    console.log("clicks" + clicks);
    if (clicks == 0) {
      clicks++;
      temporizadorSegundos = setInterval(() => {
        segundos++;
        scoreValue.text(`${segundos}.${centesimas}`);
      }, 1000);
      temporizadorCentesimas = setInterval(() => {
        centesimas++;
        scoreValue.text(`${segundos}.${centesimas}`);
      }, 100);
      spawnbloque();
    } else {
      spawnbloque();
    }

    if (clicks == 10) {
      endGame();
    }
    clicks++;
  });

  // Spawn BLoque
  function spawnbloque() {
    let bloque = $(".bloque");

    let boardWidth = gameBoard.width();
    let boardHeight = gameBoard.height();
    let bloqueSize = bloque.width();

    let leftbloquePos =
      Math.floor(Math.random() * ((boardWidth - bloqueSize) / 10)) * 10;
    let topbloquePos =
      Math.floor(Math.random() * ((boardHeight - bloqueSize) / 10)) * 10;

    // Mostrar el bloque en la posición aleatoria
    bloque.css({
      display: "block",
      top: topbloquePos + "px",
      left: leftbloquePos + "px",
    });
  }

  function endGame() {
    clearInterval(temporizadorSegundos);
    clearInterval(temporizadorCentesimas);
    clicks = 0;
    segundos = 0;
    centesimas = 0;

    $(".bloque").css({
      display: "none",
    });
    gameOverScreen.css({ display: "flex" });
    $(".score").css({ display: "none" });
    $(".reset").on("click", () => {
      gameOverScreen.hide();
      startGame();
    });
  }
}
