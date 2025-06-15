class Novia {
    constructor() {
        this.vecesAmada = 0;
        this.canciones = [
            { 
                titulo: "Baby I'm Yours", 
                artista: "Arctic Monkeys", 
                archivo: "music/baby-im-yours.mp3" 
            },
            { 
                titulo: "Birds of a Feather", 
                artista: "Billie Eilish", 
                archivo: "music/birds-of-a-feather.mp3" 
            },
            { 
                titulo: "Stop the World I Wanna Get Off With You", 
                artista: "Arctic Monkeys", 
                archivo: "music/stop-the-world.mp3" 
            },
            {
                titulo: "How did i find you?",
                artista: "SlumpAbe ",
                archivo: "music/How-Did-I-Find-You.mp3"
            }
        ];
        this.razones = [
        {
            icono: "fas fa-smile",
            titulo: "Your Smile",
            descripcion: "The way it lights up every room—and every piece of my soul. It’s the first thought that kisses my mind each morning, and the last that lingers before I sleep."
        },
        {
            icono: "fas fa-heart",
            titulo: "Your Kindness",
            descripcion: "Your heart is generous beyond words. You see the good in me effortlessly, and you inspire me to be the best version of myself."
        },
        {
            icono: "fas fa-laugh",
            titulo: "Your Sense of Humor",
            descripcion: "With your laughter, even the dullest moments become unforgettable. You turn the ordinary into magic just by being you."
        },
        {
            icono: "fas fa-hand-holding-heart",
            titulo: "Your Support",
            descripcion: "You believe in my dreams as if they were your own. Your presence gives me strength I never knew I had."
        },
        {
            icono: "fas fa-star",
            titulo: "Your Passion",
            descripcion: "Your passion The way you dedicate yourself to what you love, whether it's learning Spanish or simply improving every day in whatever you set your mind to, fills my heart with admiration. You live with such intense and beautiful intensity."
        },
        {
            icono: "fas fa-magic",
            titulo: "Your Unique Essence",
            descripcion: "Your Unique Essence You are the perfect balance of strength, tenderness, and wisdom. You always know what to say to me and when to say it. There is no one like you; you are truly unique."
        }
            ];


        
        this.cancionActual = 0;
        this.audioPlayer = new Audio();
        this.estaPlaying = false;
    }

    incrementarAmor() {
        this.vecesAmada++;
        return this.vecesAmada;
    }

    obtenerMensajeAmor() {
        const mensajes = [
            `I love you more than ${this.vecesAmada} times, my love.`,
            `My love for you keeps growing. Now I love you ${this.vecesAmada} times more!`,
            `With every second, my love increases. I love you ${this.vecesAmada} times.`,
            `You are my everything. I love you ${this.vecesAmada} times and I will keep on loving you.`,
            `Nothing compares to what I feel for you. I love you ${this.vecesAmada} times.`
        ];
        return mensajes[Math.floor(Math.random() * mensajes.length)];
    }

    reproducirCancion(index) {
        this.cancionActual = index;
        const cancion = this.canciones[index];
        this.audioPlayer.src = cancion.archivo;
        this.audioPlayer.play();
        this.estaPlaying = true;
        return cancion;
    }

    pausarCancion() {
        this.audioPlayer.pause();
        this.estaPlaying = false;
    }

    siguienteCancion() {
        this.cancionActual = (this.cancionActual + 1) % this.canciones.length;
        return this.reproducirCancion(this.cancionActual);
    }

    cancionAnterior() {
        this.cancionActual = (this.cancionActual - 1 + this.canciones.length) % this.canciones.length;
        return this.reproducirCancion(this.cancionActual);
    }
}


const miNovia = new Novia();

const counterDisplay = document.getElementById('counter-display');
const heartsContainer = document.getElementById('hearts-container');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitle = document.getElementById('song-title');
const playerInfo = document.getElementById('player-info');
const reasonsGrid = document.getElementById('reasons-grid');

// Función para crear corazones flotantes
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Contenedores
const welcomeHearts = document.getElementById('welcome-hearts');

// Función para crear corazones en cualquier contenedor
function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.7 + 0.3;

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Corazones constantes en ambas secciones
const intervalMain = setInterval(() => createHeart(heartsContainer), 400);
const intervalWelcome = setInterval(() => createHeart(welcomeHearts), 400);

// Evento para ocultar bienvenida y parar corazones
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    welcomeHearts.innerHTML = '';
    clearInterval(intervalWelcome); // detiene corazones de bienvenida
});

let loveUpdateCounter = 0;
// Actualizar el contador de amor
function updateLoveCounter() {
    miNovia.incrementarAmor();
    loveUpdateCounter++;

    // Solo actualiza el mensaje de texto cada 10 veces
    if (loveUpdateCounter % 10 === 0) {
        counterDisplay.textContent = miNovia.obtenerMensajeAmor();
    }

    if (miNovia.vecesAmada % 5 === 0) {
        createHeart();
    }

    const hue = (miNovia.vecesAmada * 0.1) % 360;
    document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 85%), hsl(${(hue + 40) % 360}, 100%, 85%))`;
}


// Cargar razones
function cargarRazones() {
    reasonsGrid.innerHTML = miNovia.razones.map(razon => `
        <div class="reason-card">
            <i class="${razon.icono}"></i>
            <h3>${razon.titulo}</h3>
            <p>${razon.descripcion}</p>
        </div>
    `).join('');
}

// reproductor de música
playBtn.addEventListener('click', function() {
    if (miNovia.estaPlaying) {
        miNovia.pausarCancion();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playerInfo.textContent = 'Music paused';
    } else {
        const cancion = miNovia.reproducirCancion(miNovia.cancionActual);
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        songTitle.textContent = `${cancion.titulo} - ${cancion.artista}`;
        playerInfo.textContent = 'Playing: ' + cancion.titulo;
    }
});

nextBtn.addEventListener('click', function() {
    const cancion = miNovia.siguienteCancion();
    songTitle.textContent = `${cancion.titulo} - ${cancion.artista}`;
    playerInfo.textContent = 'Playing: ' + cancion.titulo;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

prevBtn.addEventListener('click', function() {
    const cancion = miNovia.cancionAnterior();
    songTitle.textContent = `${cancion.titulo} - ${cancion.artista}`;
    playerInfo.textContent = 'Playing: ' + cancion.titulo;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

// Inicialización
cargarRazones();

// Iniciar el contador
setInterval(updateLoveCounter, 300);

// Crear corazones iniciales
for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 300);
}

// Configurar el reproductor de audio
miNovia.audioPlayer.addEventListener('ended', function() {
    const cancion = miNovia.siguienteCancion();
    songTitle.textContent = `${cancion.titulo} - ${cancion.artista}`;
    playerInfo.textContent = 'Playing: ' + cancion.titulo;
});


// Reproducir automáticamente "How Did I Find You?" al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const index = miNovia.canciones.findIndex(c => c.archivo === "music/How-Did-I-Find-You.mp3");
    if (index !== -1) {
        const cancion = miNovia.reproducirCancion(index);
        songTitle.textContent = `${cancion.titulo} - ${cancion.artista}`;
        playerInfo.textContent = 'Playing: ' + cancion.titulo;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});



