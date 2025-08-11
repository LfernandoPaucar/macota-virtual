document.addEventListener("DOMContentLoaded", () => {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = "¡Hola soy Cuyo! Tu nueva mascota";

    let mascota = document.getElementById("mascota");
    let x = 100; 
    let y = 300;

    let frame = 0;
    let imagenes = [
        "mascota-imagen/cuyo-parado.png",
        "mascota-imagen/cuyo-caminando.png"
    ];

    setInterval(() => {
        x += 5;
        mascota.style.left = x + "px";

        frame = (frame + 1) % imagenes.length;
        mascota.src = imagenes[frame];
    }, 100);
});