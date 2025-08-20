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


let imagenes = ["./mascota-imagen/cuyo-parado.png", "./mascota-imagen/cuyo-caminando.png"];

document.addEventListener("keydown", (e) => {
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
    mascota.src = imagenes[1];
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
    mascota.src = imagenes[0];
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
        }
    }
}

window.addEventListener("load", () => {
    colocarFruta();
    aplicarLimites();
    mascota.style.left = x + "px";
    mascota.style.top = y + "px";
})