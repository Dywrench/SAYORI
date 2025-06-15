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
                descripcion: "The way it lights up every room—and every piece of my soul. It's the first thought that kisses my mind each morning, and the last that lingers before I sleep."
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
                descripcion: "The way you dedicate yourself to what you love, whether it's learning Spanish or simply improving every day in whatever you set your mind to, fills my heart with admiration. You live with such intense and beautiful intensity."
            },
            {
                icono: "fas fa-magic",
                titulo: "Your Unique Essence",
                descripcion: "You are the perfect balance of strength, tenderness, and wisdom. You always know what to say to me and when to say it. There is no one like you; you are truly unique."
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
        this.audioPlayer.play()
            .then(() => {
                this.estaPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                songTitle.textContent = `${cancion.titulo} - ${cancion.artista}`;
                playerInfo.textContent = 'Playing: ' + cancion.titulo;
            })
            .catch(error => {
                console.error("Error playing song:", error);
                playerInfo.textContent = "Error playing song. Click play to try again.";
            });
        return cancion;
    }

    pausarCancion() {
        this.audioPlayer.pause();
        this.estaPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playerInfo.textContent = 'Music paused';
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

// DOM Elements
const counterDisplay = document.getElementById('counter-display');
const heartsContainer = document.getElementById('hearts-container');
const welcomeHearts = document.getElementById('welcome-hearts');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitle = document.getElementById('song-title');
const playerInfo = document.getElementById('player-info');
const reasonsGrid = document.getElementById('reasons-grid');
const togglePoemBtn = document.getElementById('toggle-poem-btn');
const poemaContainer = document.getElementById('poema-container');
const poemaImg = document.getElementById('poema-img');
const btnEs = document.getElementById('btn-es');
const btnEn = document.getElementById('btn-en');

// Configuración del poema
const poemas = {
    es: './images/poema_es.png',
    en: './images/poema_en.png'
};
let idiomaActual = 'es';
let poemaVisible = false;

// Función para mostrar/ocultar el poema
function togglePoema(mostrar) {
    poemaVisible = mostrar;
    poemaImg.style.display = mostrar ? 'block' : 'none';
}

// Función para cambiar idioma
function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    poemaImg.src = poemas[idioma];
    
    // Actualizar estado activo de los botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (idioma === 'es') {
        btnEs.classList.add('active');
    } else {
        btnEn.classList.add('active');
    }
    
    // Mostrar el poema solo si los botones están visibles
    if (document.getElementById('poema-buttons').style.display === 'flex') {
        togglePoema(true);
    }
}

// Evento para el botón principal
togglePoemBtn.addEventListener('click', function() {
    const buttons = document.getElementById('poema-buttons');
    
    if (buttons.style.display === 'flex') {
        // Si los botones están visibles, ocultar todo
        buttons.style.display = 'none';
        togglePoema(false);
    } else {
        // Mostrar solo los botones de idioma
        buttons.style.display = 'flex';
        togglePoema(false); // Asegurar que el poema está oculto
    }
});

// Eventos para los botones de idioma
btnEs.addEventListener('click', () => {
    cambiarIdioma('es');
    togglePoema(true);
});

btnEn.addEventListener('click', () => {
    cambiarIdioma('en');
    togglePoema(true);
});

// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar todo inicialmente
    togglePoema(false);
    document.getElementById('poema-buttons').style.display = 'none';
    
    // Configurar español como predeterminado
    btnEs.classList.add('active');
    cambiarIdioma('es');
    
    // Estilos para centrado
    poemaContainer.style.textAlign = 'center';
    poemaImg.style.margin = '20px auto';
    poemaImg.style.maxWidth = '90%';
    poemaImg.style.borderRadius = '10px';
    poemaImg.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
});

// Heart creation function
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

// Initialize heart animations
const intervalMain = setInterval(() => createHeart(heartsContainer), 400);
const intervalWelcome = setInterval(() => createHeart(welcomeHearts), 400);

// Welcome screen close event
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    welcomeHearts.innerHTML = '';
    clearInterval(intervalWelcome);
    
    // Start playing "How Did I Find You?" after closing welcome screen
    const index = miNovia.canciones.findIndex(c => c.archivo.includes("How-Did-I-Find-You"));
    if (index !== -1) {
        miNovia.reproducirCancion(index);
    }
});

// Love counter functionality
let loveUpdateCounter = 0;
function updateLoveCounter() {
    miNovia.incrementarAmor();
    loveUpdateCounter++;

    if (loveUpdateCounter % 10 === 0) {
        counterDisplay.textContent = miNovia.obtenerMensajeAmor();
    }

    if (miNovia.vecesAmada % 5 === 0) {
        createHeart(heartsContainer);
    }

    const hue = (miNovia.vecesAmada * 0.1) % 360;
    document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 85%), hsl(${(hue + 40) % 360}, 100%, 85%))`;
}

// Load reasons
function cargarRazones() {
    reasonsGrid.innerHTML = miNovia.razones.map(razon => `
        <div class="reason-card">
            <i class="${razon.icono}"></i>
            <h3>${razon.titulo}</h3>
            <p>${razon.descripcion}</p>
        </div>
    `).join('');
}

// Music player controls
playBtn.addEventListener('click', function() {
    if (miNovia.estaPlaying) {
        miNovia.pausarCancion();
    } else {
        miNovia.reproducirCancion(miNovia.cancionActual);
    }
});

nextBtn.addEventListener('click', function() {
    miNovia.siguienteCancion();
});

prevBtn.addEventListener('click', function() {
    miNovia.cancionAnterior();
});

// Audio player event listeners
miNovia.audioPlayer.addEventListener('ended', function() {
    miNovia.siguienteCancion();
});

miNovia.audioPlayer.addEventListener('error', function() {
    playerInfo.textContent = "Error playing song. Please try again.";
});

// Poem functionality - Versión mejorada
function cambiarPoema(idioma) {
    if (idioma !== idiomaActual) {
        poemaImg.src = poemas[idioma];
        poemaImg.style.display = 'block';
        idiomaActual = idioma;
        
        // Actualizar estado activo de los botones
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (idioma === 'es') {
            btnEs.classList.add('active');
        } else {
            btnEn.classList.add('active');
        }
        
        // Pequeña animación al cambiar
        poemaImg.style.animation = 'none';
        setTimeout(() => {
            poemaImg.style.animation = 'fadeIn 0.5s ease-out';
        }, 10);
    }
}

togglePoemBtn.addEventListener('click', function() {
    // Añadir estilos al botón principal
    togglePoemBtn.classList.add('poem-btn');
    
    poemaContainer.classList.toggle('show');
    const buttons = document.getElementById('poema-buttons');
    buttons.style.display = poemaContainer.classList.contains('show') ? 'flex' : 'none';
    buttons.classList.add('language-buttons');
    
    if (poemaContainer.classList.contains('show') && !poemaImg.src) {
        poemaImg.src = poemas[idiomaActual];
        poemaImg.style.display = 'block';
    }
    
    // Añadir estilos a los botones de idioma
    btnEs.classList.add('lang-btn');
    btnEn.classList.add('lang-btn');
    if (idiomaActual === 'es') {
        btnEs.classList.add('active');
    } else {
        btnEn.classList.add('active');
    }
    
    // Animación al mostrar/ocultar
    if (poemaContainer.classList.contains('show')) {
        poemaContainer.style.animation = 'fadeIn 0.5s ease-out';
    }
});

btnEs.addEventListener('click', () => cambiarPoema('es'));
btnEn.addEventListener('click', () => cambiarPoema('en'));

// Initialization
cargarRazones();
setInterval(updateLoveCounter, 300);

// Create initial hearts
for (let i = 0; i < 20; i++) {
    setTimeout(() => createHeart(heartsContainer), i * 300);
}

// Asegurar estilos al cargar
document.addEventListener('DOMContentLoaded', function() {
    // Estilo para el botón principal del poema
    togglePoemBtn.classList.add('poem-btn');
    togglePoemBtn.style.background = 'linear-gradient(135deg, #ff6fa8, #d7385e)';
    togglePoemBtn.style.color = 'white';
    togglePoemBtn.style.border = 'none';
    togglePoemBtn.style.padding = '12px 24px';
    togglePoemBtn.style.fontSize = '1.1rem';
    togglePoemBtn.style.borderRadius = '50px';
    togglePoemBtn.style.cursor = 'pointer';
    togglePoemBtn.style.transition = 'all 0.3s ease';
    togglePoemBtn.style.boxShadow = '0 4px 15px rgba(215, 56, 94, 0.3)';
    togglePoemBtn.style.display = 'inline-flex';
    togglePoemBtn.style.alignItems = 'center';
    togglePoemBtn.style.gap = '10px';
    togglePoemBtn.style.margin = '15px 0';
    
    // Estilo para los botones de idioma
    const buttonsContainer = document.getElementById('poema-buttons');
    buttonsContainer.classList.add('language-buttons');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.gap = '15px';
    buttonsContainer.style.marginTop = '20px';
    
    btnEs.classList.add('lang-btn');
    btnEn.classList.add('lang-btn');
    
    [btnEs, btnEn].forEach(btn => {
        btn.style.background = 'rgba(255, 255, 255, 0.9)';
        btn.style.color = '#d7385e';
        btn.style.border = '2px solid #ffafbd';
        btn.style.padding = '8px 20px';
        btn.style.borderRadius = '50px';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.3s ease';
        btn.style.fontSize = '0.95rem';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '8px';
        btn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
    
    if (idiomaActual === 'es') {
        btnEs.classList.add('active');
        btnEs.style.background = '#d7385e';
        btnEs.style.color = 'white';
        btnEs.style.borderColor = '#d7385e';
    } else {
        btnEn.classList.add('active');
        btnEn.style.background = '#d7385e';
        btnEn.style.color = 'white';
        btnEn.style.borderColor = '#d7385e';
    }
});

// Añadir estilos hover dinámicamente
togglePoemBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 6px 20px rgba(215, 56, 94, 0.4)';
    this.style.background = 'linear-gradient(135deg, #d7385e, #ff6fa8)';
});

togglePoemBtn.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '0 4px 15px rgba(215, 56, 94, 0.3)';
    this.style.background = 'linear-gradient(135deg, #ff6fa8, #d7385e)';
});

[btnEs, btnEn].forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.background = '#ff6fa8';
            this.style.color = 'white';
            this.style.borderColor = '#ff6fa8';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.background = 'rgba(255, 255, 255, 0.9)';
            this.style.color = '#d7385e';
            this.style.borderColor = '#ffafbd';
        }
    });
});