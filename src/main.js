import _ from 'underscore';

let Baraja = [];
let jugador = [];
let PC = [];
let puntuacionJugador = 0;
let puntuacionPC = 0;

const boton_JuegoNuevo = document.getElementById("juegoNuevo");
const boton_pedirCarta = document.getElementById("pedirCarta");
const div_jugador = document.getElementById("jugador");
const div_PC = document.getElementById("PC"); // <--- asegúrate de tener este contenedor en el HTML
const boton_parar = document.getElementById("parar");

boton_pedirCarta.disabled = true;
boton_parar.disabled = true;

const crearBaraja = () => {
  let baraja = [];
  let numero = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'K', 'Q', 'A'];
  let simbolos = ['C', 'D', 'H', 'S'];
  for (let i = 0; i < simbolos.length; i++) {
    for (let i2 = 0; i2 < numero.length; i2++) {
      baraja.push(numero[i2] + simbolos[i]);
    }
  }
  return _.shuffle(baraja);
};

const obtenerValorCarta = (carta, puntajeActual) => {
  let valor = carta.slice(0, -1);
  if (isNaN(valor)) {
    if (valor === 'A') {
      return (puntajeActual + 11 > 21) ? 1 : 11;
    }
    return 10;
  }
  return parseInt(valor);
};

const juegoNuevo = () => {
  Baraja = crearBaraja();
  jugador.forEach(carta => {
    let cartaRemove = document.getElementById(carta);
    if (cartaRemove) cartaRemove.remove();
  });
  PC.forEach(carta => {
    let cartaRemove = document.getElementById("PC-" + carta);
    if (cartaRemove) cartaRemove.remove();
  });

  jugador = [];
  PC = [];
  puntuacionJugador = 0;
  puntuacionPC = 0;
  boton_JuegoNuevo.disabled = true;
  boton_pedirCarta.disabled = false;
  boton_parar.disabled = false;
};

const pedirCarta = () => {
  let carta = Baraja.pop();
  jugador.push(carta);
  let nuevaCarta = document.createElement("img");7
  
  nuevaCarta.src = `public/cartas/${carta}.png`;
  nuevaCarta.setAttribute("class", "carta");
  nuevaCarta.setAttribute("id", carta);
  div_jugador.appendChild(nuevaCarta);

  puntuacionJugador += obtenerValorCarta(carta, puntuacionJugador);

  if (puntuacionJugador > 21) {
    boton_JuegoNuevo.disabled = false;
    boton_pedirCarta.disabled = true;
    boton_parar.disabled = true;
    alert("¡Perdiste! Tu puntuación fue " + puntuacionJugador);
  }
};

const parar = () => {
  boton_pedirCarta.disabled = true;
  boton_parar.disabled = true;

  alert("Turno de la computadora...");
  setTimeout(() => {
    while ((puntuacionPC < 17 || puntuacionPC < puntuacionJugador) && puntuacionPC <= 21) {
      let carta = Baraja.pop();
      PC.push(carta);
      let nuevaCarta = document.createElement("img");
      nuevaCarta.src = `public/cartas/${carta}.png`;
      nuevaCarta.setAttribute("class", "carta");
      nuevaCarta.setAttribute("id", "PC-" + carta);
      div_PC.appendChild(nuevaCarta);

      puntuacionPC += obtenerValorCarta(carta, puntuacionPC);
    }

    setTimeout(() => {
      if (puntuacionPC > 21 || puntuacionJugador > puntuacionPC) {
        alert("¡Ganaste! Computadora sacó " + puntuacionPC);
      } else if (puntuacionJugador < puntuacionPC) {
        alert("¡Perdiste! Computadora sacó " + puntuacionPC);
      } else {
        alert("¡Empate! Ambos sacaron " + puntuacionJugador);
      }

      boton_JuegoNuevo.disabled = false;
    }, 500);
  }, 500);
};

boton_JuegoNuevo.addEventListener("click", juegoNuevo);
boton_pedirCarta.addEventListener("click", pedirCarta);
boton_parar.addEventListener("click", parar);
