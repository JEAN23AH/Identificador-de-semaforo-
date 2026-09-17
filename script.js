document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("camara-stream");
    const btnIniciar = document.getElementById("btn-iniciar");

    btnIniciar.addEventListener("click", async () => {
        try {
            // Configuramos constraints para solicitar preferiblemente la cámara trasera ("environment")
            const constraints = {
                video: {
                    facingMode: "environment"  // Forzar cámara trasera. Si falla en PC, usa solo { facingMode: "environment" }
                }
            };

            // Intentamos obtener el flujo de medios de la cámara
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Asignamos el flujo de la cámara al elemento <video>
            videoElement.srcObject = stream;
            
            // Ocultamos el botón una vez que la cámara está activa
            btnIniciar.style.display = "none";
            
        } catch (error) {
            console.error("Error al acceder a la cámara: ", error);
            // Plan B por si el celular o el navegador no dejan forzar la trasera exacta
            activarCamaraAlternativa(videoElement, btnIniciar);
        }
    });
});

// Función de respaldo genérica (por si la cámara trasera exacta da error en computadores de prueba)
async function activarCamaraAlternativa(videoElement, btnIniciar) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        btnIniciar.style.display = "none";
    } catch (err) {
        alert("No se pudo acceder a la cámara. Revisa los permisos del navegador.");
    }
}