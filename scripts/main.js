// Bloquear scroll al inicio
document.body.classList.add('no-scroll');

// Desbloquear tras la animación inicial (aprox 6.2s según tu CSS)
// En tu archivo main.js
setTimeout(() => {
    // Quitamos el bloqueo de scroll
    document.body.style.overflow = "auto"; 
    
    // Mostramos el Hero y el Dock
    document.querySelector('.hero-text').classList.add('show');
    document.querySelector('.floating-dock').classList.add('show');
    
    // Opcional: Ocultar el contenedor inicial del DOM para evitar conflictos
    document.querySelector('.container').style.display = 'none';
}, 6200); // Tiempo que coincide con tu fadeOutFinal


setTimeout(() => {
    document.body.classList.add('content-ready');
    // Aquí disparas tus clases .show del hero y el dock
}, 6200);


let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.08; // Cuanto más bajo, más pesado se siente el texto

function animate() {
    // Cálculo de inercia
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;
    
    ballX = ballX + (distX * speed);
    ballY = ballY + (distY * speed);
    
    const text = document.querySelector('.hero-content h2');
    if(text) {
        text.style.transform = `translate(${ballX / 15}px, ${ballY / 15}px)`;
    }
    
    requestAnimationFrame(animate);
}

document.querySelector('.hero-text').addEventListener('mousemove', (e) => {
    // Centramos el eje en el medio de la pantalla
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 4; // Ajustado al 50% de arriba
});

animate();

const phrases = [
    "Un software para gobernarlos a todos",
    "Le haré a tu empresa una oferta que no podrá rechazar",
    "Dile hola a mi pequeño CRM",
    "Que las tareas te acompañen",
    "¡Es peligroso gestionar solo! Toma esto",
    "¿CRM? A donde vamos no necesitamos CRM",
    "Libera tu mente... y tus tareas",
    "Hasta la vista, Excel",
    "Yo soy el que ficha"
];

const hero = document.querySelector('.hero-text');
const phraseElement = document.getElementById('random-phrase');

hero.addEventListener('mouseenter', () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    phraseElement.textContent = phrases[randomIndex];
});




// Esperamos a que la animación de inicio termine (6.2s)
setTimeout(() => {
    const items = document.querySelectorAll('.dock-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const section = document.getElementById(targetId);

            if (section) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: section, offsetY: 20 },
                    ease: "power4.inOut"
                });
            }
        });
    });
}, 6200);




document.addEventListener('DOMContentLoaded', () => {
    const hand = document.getElementById('hand');
    const title = document.getElementById('info-title');
    const text = document.getElementById('info-text');
    const markers = document.querySelectorAll('.marker');

    const data = {
        auditoria: {
            titulo: "Auditoría inteligente",
            descripcion: "Consulta toda la información necesaria sobre tus empleados.",
            color: "var(--cyan)"
        },
        geo: {
            titulo: "Fichaje con geolocalización",
            descripcion: "Permite registrar la jornada laboral desde el móvil con geolocalización.",
            color: "var(--orange)"
        },
        fichar: {
            titulo: "Notificaciones para fichar",
            descripcion: "No te olvides de comenzar, ni cerrar tu jornada.",
            color: "var(--cyan)"
        },
        jornada: {
            titulo: "Registro de jornada laboral",
            descripcion: "Registra la jornada laboral de los trabajadores de forma sencilla desde cualquier dispositivo.",
            color: "var(--orange)"
        },
    };

    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const infoKey = marker.getAttribute('data-info');
            const angle = marker.style.getPropertyValue('--angle');
            const info = data[infoKey];

            // 1. Mover la manecilla
            hand.style.transform = `translateX(-50%) rotate(${angle})`;

            // 2. Animación de texto con GSAP (ya que lo tienes cargado)
            gsap.to(".info-box", {
                duration: 0.3,
                opacity: 0,
                x: 20,
                onComplete: () => {
                    title.innerText = info.titulo;
                    text.innerText = info.descripcion;
                    title.style.color = info.color;
                    
                    gsap.to(".info-box", {
                        duration: 0.5,
                        opacity: 1,
                        x: 0
                    });
                }
            });
            
            // 3. Feedback visual en el marcador
            markers.forEach(m => m.style.borderColor = "var(--orange)");
            marker.style.borderColor = info.color;
        });
    });
});








document.querySelectorAll('.crm-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.5 // Se dispara cuando vemos el 50% de la sección
    };

    const taskObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Buscamos todas las tarjetas dentro de la sección visible
                const cards = entry.target.querySelectorAll('.task-card');
                
                cards.forEach(card => {
                    const progress = card.getAttribute('data-progress');
                    // Inyectamos el valor en la variable CSS --w
                    card.style.setProperty('--w', `${progress}%`);
                });
                
                // Dejamos de observar una vez que ya se han animado
                taskObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Empezamos a observar la sección de tareas
    const targetSection = document.getElementById('tareas');
    if (targetSection) {
        taskObserver.observe(targetSection);
    }
});








document.querySelectorAll('.sim-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Cambiar botón activo
        document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Obtener datos
        const hours = parseInt(btn.dataset.hours);
        const price = parseInt(btn.dataset.price);
        const desc = btn.dataset.desc;
        
        const subtotal = hours * price;
        const total = (subtotal * 1.21).toFixed(2);

        // Cambiar textos con pequeña animación GSAP
        gsap.to(".live-invoice", { opacity: 0.5, scale: 0.98, duration: 0.15, yoyo: true, repeat: 1 });
        
        setTimeout(() => {
            document.getElementById('inv-desc').innerText = desc;
            document.getElementById('inv-hours').innerText = hours + 'h';
            document.getElementById('inv-price').innerText = price + '€';
            document.getElementById('inv-subtotal').innerText = subtotal + '€';
            document.getElementById('inv-total').innerText = total + '€';
        }, 150);
    });
});



setInterval(() => {
    const statusText = document.getElementById('ai-status');
    if (statusText) {
        statusText.innerText = statusText.innerText === "PROCESANDO AUDIO..." ? "GENERANDO NOTAS..." : "PROCESANDO AUDIO...";
    }
}, 4000);
