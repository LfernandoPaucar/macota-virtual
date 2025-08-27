document.addEventListener("DOMContentLoaded", () => {
    const mensaje =document.getElementById("mensaje");
    mensaje.textContent = "¡Hola, soy Cuyo! Muéveme con ↑ ↓ ← → y recoge la fruta 🍓";
});

const gameArea = document.getElementById("game-area");
const fruta = document.getElementById("fruta");
const puntosSpan = document.getElementById("puntos");

const mascota = document.getElementById("mascota");
let x = 100; // posición horizontal
let y = 300; // posicion vertical
let puntos = 0;
let velocidadFruta = 1800;
let energiaPerdida = 5;


let imagenes = ["./mascota-imagen/cuyo-parado.png", "./mascota-imagen/cuyo-caminando.png", "./mascota-imagen/cuyo-a-la-izquierda.png", "./mascota-imagen/cuyo-sentado.png"];

document.addEventListener("keydown", (e) => {
    if(!juegoActivo) return;
    const keys = ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];
  if (keys.includes(e.key)) e.preventDefault(); // evita scroll

  console.log("Tecla:", e.key); // verifica que llegan
    if (e.key === "ArrowRight") moverDerecha();
    if (e.key === "ArrowLeft")  moverIzquierda();
    if (e.key === "ArrowUp")    moverArriba();
    if (e.key === "ArrowDown")  moverAbajo();
});

function moverDerecha(){
    x += 5;
    aplicarLimites();
    mascota.style.left = x + "px";
    mascota.src = imagenes[1];
    verificarColision();
}

function moverIzquierda(){
    x -= 5;
    aplicarLimites();
    mascota.style.left = x + "px";
    mascota.src = imagenes[2];
    verificarColision();
}

function moverArriba(){
    y -= 5;
    aplicarLimites();
    mascota.style.top = y + "px";
    mascota.src = imagenes[0];
    verificarColision();
}

function moverAbajo(){
    y += 5;
    aplicarLimites();
    mascota.style.top = y + "px";
    mascota.src = imagenes[3];
    verificarColision();
}


// Limitar a cuyo dentro del area

function aplicarLimites() {
    const maxX = gameArea.clientWidth - mascota.offsetWidth;
    const maxY = gameArea.clientHeight - mascota.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
}

function colocarFruta() {
    const fw = fruta.offsetWidth || 100;
    const fh = fruta.offsetHeight || 110;

    const maxX = gameArea.clientWidth - fw;
    const maxY = gameArea.clientHeight - fh;

    const rx = Math.random() * maxX;
    const ry = Math.random() * maxY;

    fruta.style.left = rx + "px";
    fruta.style.top = ry + "px";
}


function hayColision(a, b){
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();

    return !(
        ar.right < br.left ||
        ar.left > br.right ||
        ar.bottom < br.top ||
        ar.top > br.bottom
    );
}

function verificarColision() {
    if (hayColision(mascota, fruta)){
        if(hayColision(mascota, fruta)){
            puntos += 1;
            puntosSpan.textContent = puntos;
            colocarFruta();
            aumentarEnergia(10);
            verificarNivel();
        }
    }
}

function verificarNivel(){
    if(puntos >= 50){
        velocidadFruta = 900;
        energiaPerdida = 10;
        mensaje.textContent = "¡Nivel 3! Modo experto 🔥";
    } else if (puntos >= 25){
        velocidadFruta = 1400;
        energiaPerdida = 7;
        mensaje.textContent = "¡Nivel 2! Ahora es más difícil 😼"
    } else{
        velocidadFruta = 1800;
        energiaPerdida = 5;
        mensaje.textContent = "¡Nivel 1! Vamos Cuyo 🐹"
    }
}

window.addEventListener("load", () => {
    colocarFruta();
    aplicarLimites();
    mascota.style.left = x + "px";
    mascota.style.top = y + "px";
    aumentarEnergia(10);
})

let energia = 100;
const energiaBarra = document.getElementById("energia-barra");

//actualizarEnergia();

//setInterval(reducirEnergia, 2000);

function reducirEnergia (){
    if (!juegoActivo) return

    energia -= energiaPerdida;
    if (energia < 0) energia = 0;
    actualizarEnergia();

    if(energia === 0){
        mensaje.textContent = "GAME OVER - Cuyo esta cansado";
        juegoActivo = false;
        clearInterval(energiaInterval);
        btnReiniciar.style.display = "inline-block"
    }

}


function aumentarEnergia(cantidad) {
    energia += cantidad;
    if (energia > 100) energia = 100; // maximo 100
    actualizarEnergia();
}

function actualizarEnergia(){
    energiaBarra.style.width = energia + "%";

    if(energia < 60){
        energiaBarra.style.backgroundColor = "orange";
    } else if(energia > 30){
        energiaBarra.style.backgroundColor = "green";
    } else {
        energiaBarra.style.backgroundColor = "red";
    }
}

let juegoActivo = false;
let energiaInterval;

// Botones

const btnInicio = document.getElementById("btn-inicio");
const btnReiniciar = document.getElementById("btn-reiniciar");

btnInicio.addEventListener("click", iniciarJuego);
btnReiniciar.addEventListener("click", reiniciarJuego);

function iniciarJuego (){
    if(juegoActivo) return;

    juegoActivo = true;
    energia = 100;
    puntos = 0;
    actualizarEnergia();
    mensaje.textContent = "El juego comenzo";
    btnInicio.style.display = "none";
    btnReiniciar.style.display = "none";

    energiaInterval = setInterval(reducirEnergia, 2000);
    colocarFruta();
}

function reiniciarJuego(){
    energia = 100;
    puntos = 0;
    actualizarEnergia();
    mensaje.textContent = "¡Tu cuyo revive!";
    btnReiniciar.style.display = "none";
    btnInicio.style.display = "inline-block";
}
