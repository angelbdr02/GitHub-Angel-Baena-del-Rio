let jugador = 1; // La variable jugador controla controla el turno y se guarda en el tablero cuadno hace click
let casillas = document.querySelectorAll(".casilla"); // casillas sera un array qeu contine todos los elementos de la clase casilla, se usa para colorearla segun el jugador que ha hecho click
let tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ganador = false;
//Estas son todas la combinaciones posibles que hay en la partida
let combinaciones = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
 
];

function jugada(num) {
    if (!ganador && tablero[num - 1] === 0) {
      tablero[num - 1] = jugador;
      casillas[num - 1].classList.add("jugador" + jugador);
      const ganador = comprobarGanador();
      if (ganador !== -1) {
        // Resalta casillas en amarillo
        combinaciones[ganador].forEach(index => {
          casillas[index].classList.add("ganador");
        });
        //Estas son las alertas de si un jugador ha ganado pues que salga la alerta diciendo quien ha ganado
        alert("Jugador " + jugador + " ha ganado");
        ganador = true;
      } else if (comprobarEmpate()) {
        alert("Empate");
        ganador = true;
      } else {
        cambiarJugador();
      }
    }
  }
  


function cambiarJugador() {
  jugador = jugador === 1 ? 2 : 1; //esto es un operador ternario. si jugador=1 el valor cambia a 2 y en caso contrario cambia a 1. Conclusion alterna el valor de jugador entre 1 y 2
}

// En esta funcion NO hay ningun error
function comprobarGanador() {
    for (let i = 0; i < combinaciones.length; i++) {
      const combinacion = combinaciones[i];
      let ganador = true;
      for (let j = 0; j < combinacion.length; j++) {
        const casilla = combinacion[j];
        if (tablero[casilla] !== jugador) {
          ganador = false;
          break;
        }
      }
      if (ganador) {
        return i; 
      }
    }
    return -1; 
  }


function comprobarEmpate() {
  return !tablero.includes(0);
}
//Con el getElementByid obtengo los botones donde quiero hacer eventos
const resetBtn = document.getElementById("reset");
const otraPartidaBtn = document.getElementById("otra");

resetBtn.addEventListener("click", resetearJuego);
otraPartidaBtn.addEventListener("click", iniciarOtraPartida);
//Esta función es la de resetear, si le das al boton de reset, he puesto que elimine los movimientos de los jugadores
function resetearJuego() {
  jugador = 1;
  ganador = false;
  tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  casillas.forEach(casilla => {
    casilla.classList.remove("jugador1", "jugador2");
  });
}

  


function iniciarOtraPartida() {
  resetearJuego();
}
