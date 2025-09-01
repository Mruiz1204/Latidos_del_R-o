// Variables globales del carrusel
let currentSlide = 0;
const totalSlides = 7;
let autoPlayInterval;

// Función para abrir el carrusel
function openCarousel() {
    document.getElementById('bocetosCarousel').classList.add('active');
    document.getElementById('carouselOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    startAutoPlay();
}

// Función para cerrar el carrusel
function closeCarousel() {
    document.getElementById('bocetosCarousel').classList.remove('active');
    document.getElementById('carouselOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
    stopAutoPlay();
}

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-dot');
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Navegar al siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Navegar al slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Ir a un slide específico
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Iniciar reproducción automática
function startAutoPlay() {
    stopAutoPlay(); // Evitar múltiples intervalos
    autoPlayInterval = setInterval(nextSlide, 4000);
}

// Detener reproducción automática
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Funciones para el moodboard
function openMoodboard() {
    document.getElementById('moodboardModal').classList.add('active');
    document.getElementById('moodboardOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMoodboard() {
    document.getElementById('moodboardModal').classList.remove('active');
    document.getElementById('moodboardOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación con teclado - UNIFICADA PARA AMBOS MODALES
    document.addEventListener('keydown', (e) => {
        const carousel = document.getElementById('bocetosCarousel');
        const moodboard = document.getElementById('moodboardModal');
        
        // Controles del carrusel
        if (carousel && carousel.classList.contains('active')) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') closeCarousel();
        }
        
        // Controles del moodboard
        if (moodboard && moodboard.classList.contains('active')) {
            if (e.key === 'Escape') closeMoodboard();
        }
    });

    // Pausar auto-play al pasar el mouse sobre el carrusel
    const carousel = document.getElementById('bocetosCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', () => {
            if (carousel.classList.contains('active')) {
                startAutoPlay();
            }
        });
    }

    // Animaciones de entrada para elementos fade-in
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));

    // Navegación suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Cerrar modales si se hace clic fuera de ellos - UNIFICADO
document.addEventListener('click', function(e) {
    const carousel = document.getElementById('bocetosCarousel');
    const moodboard = document.getElementById('moodboardModal');
    
    // Cerrar carrusel
    if (carousel && carousel.classList.contains('active')) {
        if (e.target.id === 'carouselOverlay') {
            closeCarousel();
        }
    }
    
    // Cerrar moodboard
    if (moodboard && moodboard.classList.contains('active')) {
        if (e.target.id === 'moodboardOverlay') {
            closeMoodboard();
        }
    }
});