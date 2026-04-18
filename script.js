// --- CONFIGURACIÓN ---
const misMensajes = [
    "¡Eres Preciosa!",
    "¡Eres Hermosa!",
    "Tú puedes con todo.",
    "Sonríe, te queda bien.",
    "Te vistes hermoso.",
    "No dejes de soñar.",
    "Que inteligente eres.",
    "Te ves hermosa hoy",
    "Eres tan buena persona",
    "Tienes un bonito corazón",
    "Te ves hermosa hoy",
    "Eres muy fuerte",
    "No dudes de ti",
    "Tu sonrisa es tu outfit mas hermoso",
    "¿Como que no eres bonita? ¿Estas loquita?",
    "Cuando algo te gusta, te brillan los ojos de manera unica",
    "Eres suficiente hoy, mañana y siempre.",
    "Eres la respuesta a la pregunta '¿qué es la belleza?'.",
    "Eres perfecta así.",
    "Te admiro.",
    "Vales oro.",
    "La cámara no alcanza a captar lo que tu presencia transmite.",
    "Tu esencia no tiene competencia.",
    "El mundo es más brillante porque tú estás en él.",
    "Mereces todo el amor que das a los demás.",

    // ¡Añade aquí tantos mensajes como quieras entre comillas y separados por coma!
];
// --- LÓGICA DEL UNIVERSO DE FONDO (CANVAS) ---
const canvas = document.getElementById('universo');
const ctx = canvas.getContext('2d');
let estrellas = [];

// Ajustar tamaño del lienzo a la ventana
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

class Estrella {
    constructor() {
        this.resetear();
    }

    resetear() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocidadY = (Math.random() * 0.5) + 0.1; // Velocidad de caída
        this.tamano = Math.random() * 1.5;
        this.brillo = Math.random(); // Brillo inicial aleatorio
    }

    dibujar() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brillo})`; // Color blanco con brillo variable
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamano, 0, Math.PI * 2);
        ctx.fill();
    }

    actualizar() {
        this.y += this.velocidadY; // Caída hacia abajo

        // Parpadeo suave
        this.brillo += (Math.random() - 0.5) * 0.05;
        if (this.brillo < 0) this.brillo = 0;
        if (this.brillo > 1) this.brillo = 1;

        // Si la estrella se sale por abajo, vuelve a arriba
        if (this.y > canvas.width) {
            this.resetear();
            this.y = -10; // Empieza justo arriba de la pantalla
        }
    }
}

// Crear 150 estrellas
for (let i = 0; i < 150; i++) {
    estrellas.push(new Estrella());
}

// Función principal de animación
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo en cada cuadro
    estrellas.forEach(estrella => {
        estrella.actualizar();
        estrella.dibujar();
    });
    requestAnimationFrame(animar);
}

// Iniciar la animación del fondo
animar();


// --- LÓGICA DE INTERACCIÓN DEL BOTÓN ---
const boton = document.getElementById('boton-estrella');
const contenedorMensajes = document.getElementById('contenedor-mensajes');

boton.addEventListener('click', () => {
    // 1. Obtener un mensaje aleatorio de la lista
    const indiceAleatorio = Math.floor(Math.random() * misMensajes.length);
    const mensajeAleatorio = misMensajes[indiceAleatorio];

    // 2. Crear un nuevo elemento de texto (DIV)
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje-texto');
    nuevoMensaje.textContent = mensajeAleatorio;

    // 3. Calcular posición aleatoria en pantalla
    const posX = Math.random() * (window.innerWidth - 200); // Evitar que se corte en el borde derecho
  const posY = (Math.random() * (window.innerHeight * 0.7)) + 50; // Evitar que se corte arriba/abajo

    // 4. Aplicar la posición al nuevo mensaje
    nuevoMensaje.style.left = `${posX}px`;
    nuevoMensaje.style.top = `${posY}px`;

    // 5. Añadir el mensaje al contenedor
    contenedorMensajes.appendChild(nuevoMensaje);

    // 6. Eliminar el mensaje automáticamente después de que termine la animación (4s)
    setTimeout(() => {
        contenedorMensajes.removeChild(nuevoMensaje);
    }, 4000); // 4000 milisegundos = 4 segundos
});
