import _ from 'underscore'

let Baraja = [];
let jugador = [];
let PC =[];
let puntuacionJugador = 0;

const boton_JuegoNuevo = document.getElementById("juegoNuevo");
const boton_pedirCarta = document.getElementById("pedirCarta");
const div_jugador = document.getElementById("jugador");
const boton_parar = document.getElementById("parar");
boton_pedirCarta.disabled = true;
boton_parar.disabled = true;

const crearBaraja =()=>{
  let baraja = [];
  let numero =[2,3,4,5,6,7,8,9,10,'J','K','Q','A'];
  let simbolos = ['C','D','H','S'];
  //console.log(simbolos.length);
  for (let i = 0; i < simbolos.length; i++) {
    for (let i2 = 0; i2 < numero.length; i2++) {
      baraja.push(numero[i2]+simbolos[i]);
    }
  }
  baraja = _.shuffle(baraja);
  console.log(baraja);
  return baraja
}

const juegoNuevo = ()=>{
  Baraja = crearBaraja();
  jugador.map(carta => {
    let cartaRemove = document.getElementById(carta);
    cartaRemove.remove();
  })

  jugador = [];
  PC =[];
  puntuacionJugador = 0;
  boton_JuegoNuevo.disabled = true;
  boton_pedirCarta.disabled = false;
  boton_parar.disabled = false;
}

const pedirCarta = ()=> {
  let carta = Baraja.pop();
  console.log("jugador");
  console.log(jugador);
  console.log(carta);
  jugador.push(carta);
  let nuevaCarta = document.createElement("img");
  console.log(nuevaCarta);
  nuevaCarta.src = `src/cartas/${carta}.png`
  nuevaCarta.setAttribute("class","carta");
  nuevaCarta.setAttribute("id",carta);
  div_jugador.appendChild(nuevaCarta);
  let conteo = 0;
  let valorCarta = carta[0];
  if (valorCarta == 'Q') valorCarta = 10;
  if (valorCarta == 'K') valorCarta = 10;
  if (valorCarta == 'J') valorCarta = 10;
  if (valorCarta == 'A'){
    if((puntuacionJugador +11) > 21) {
      valorCarta = 1;
    }
    else valorCarta = 11;
  } 
  puntuacionJugador = puntuacionJugador + parseInt(valorCarta);
  console.log(puntuacionJugador);
  if (puntuacionJugador>21){
    boton_JuegoNuevo.disabled = false;
    boton_pedirCarta.disabled = true;
    boton_parar.disabled = true;
    alert("perdiste");
  }

}

const parar = () =>{
  alert("es turno de la computadora");
}
boton_JuegoNuevo.addEventListener("click", juegoNuevo);
boton_pedirCarta.addEventListener("click", pedirCarta);
boton_parar.addEventListener("click", parar);
