let jugador = 1; 
let casillas = document.querySelectorAll(".casilla"); 
let tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ganador = false;
let puntosJugador1 = 0;
let puntosJugador2 = 0;
let partidaNueva = true;
let jugadorGanadorAnterior = null;
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



function cambiarJugador() {
  jugador = jugador === 1 ? 2 : 1;
  const turnoTexto = document.getElementById("turno");
  turnoTexto.textContent = "Turno Jugador " + jugador;
}
  

// En esta funcion NO hay ningun error
function comprobarGanador() {
  for (let i = 0; i < combinaciones.length; i++) {
    const combinacion = combinaciones[i];
    const a = tablero[combinacion[0]];
    const b = tablero[combinacion[1]];
    const c = tablero[combinacion[2]];
    if (a !== 0 && a === b && b === c) {
      ganador = true; // Establecer ganador como true si se encuentra un ganador
      return a; // Devuelve el número del jugador que ganó
    }
  }
  return 0; // Si no se encuentra un ganador, devuelve 0
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-mensaje");
  modalMessage.textContent = message;
  modal.style.display = "block"; // Mostrar el modal
}

// Modifica la función jugada para mostrar el modal si hay un ganador
function jugada(num) {
  if (!ganador && tablero[num - 1] === 0) {
    tablero[num - 1] = jugador;
    casillas[num - 1].classList.add("jugador" + jugador);
    const ganadorActual = comprobarGanador();
    if (ganadorActual !== 0) {
      // Resaltar casillas en amarillo
      combinaciones.forEach(combinacion => {
        const [a, b, c] = combinacion;
        if (tablero[a] === ganadorActual && tablero[b] === ganadorActual && tablero[c] === ganadorActual) {
          casillas[a].classList.add("ganador");
          casillas[b].classList.add("ganador");
          casillas[c].classList.add("ganador");
        }
      });
      // Sumar un punto al ganador
      if (ganadorActual === 1) {
        puntosJugador1++;
      } else {
        puntosJugador2++;
      }
      actualizarContadorPuntos();
      // Mostrar la alerta con el ganador
      showModal("¡Jugador " + ganadorActual + " ha ganado!");
      ganador = true;
    } else if (comprobarEmpate()) {
      showModal("¡Empate!");
      ganador = true;
    } else {
      cambiarJugador();
    }
  }
}


function actualizarContadorPuntos() {
  const contadorPuntos = document.getElementById("contador-puntos");
  contadorPuntos.textContent = "J1: " + puntosJugador1 + " - J2: " + puntosJugador2;
}


function comprobarEmpate() {
  return !tablero.includes(0);
}
//Con el getElementByid obtengo los botones donde quiero hacer eventos
const resetBtn = document.getElementById("reset");
const otraPartidaBtn = document.getElementById("otra");

resetBtn.addEventListener("click", resetearJuego);
otraPartidaBtn.addEventListener("click", iniciarOtraPartida);

function resetearJuego() {
  jugador = 1;
  ganador = false;
  tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  casillas.forEach(casilla => {
    casilla.classList.remove("jugador1", "jugador2", "ganador");
  });
  const turnoTexto = document.getElementById("turno");
  turnoTexto.textContent = "Turno Jugador 1";

  // Reiniciar el contador de puntos solo si es una partida nueva
  if (partidaNueva) {
    puntosJugador1 = 0;
    puntosJugador2 = 0;
    actualizarContadorPuntos();
  }

  partidaNueva = true; // Establece que es una partida nueva
  showModal("Juego reiniciado");
}

// Modifica la función iniciarOtraPartida para mostrar el modal con un mensaje
function iniciarOtraPartida() {
  jugador = 1;
  ganador = false;
  tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  casillas.forEach(casilla => {
    casilla.classList.remove("jugador1", "jugador2", "ganador");
  });
  const turnoTexto = document.getElementById("turno");
  turnoTexto.textContent = "Turno Jugador 1";
  showModal("Otra partida iniciada");
}

// Event listener para cerrar el modal al hacer clic en la X
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function() {
  const modal = document.getElementById("modal");
  modal.style.display = "none"; // Ocultar el modal
});

// Event listener para cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none"; // Ocultar el modal
  }
});




