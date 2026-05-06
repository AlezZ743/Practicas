
/*---------------------Pestañas---------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.content');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // EVITA QUE LA PÁGINA SALTE HACIA ARRIBA
            e.preventDefault(); 

            const id = btn.dataset.id;

            // Quitar clase active de todos los botones
            buttons.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clicado
            btn.classList.add('active');

            // Ocultar todos los contenidos
            contents.forEach(content => content.classList.remove('active'));
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(id);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
});



/*---------------------------------------Cartas + indicador de click---------------------------------------------------*/

function rotateCards(clickedCard) {
    const container = clickedCard.parentElement;
    
    // Buscar el indicador y ocultarlo si existe
    const indicator = clickedCard.querySelector('.click-indicator');
    if (indicator) {
        indicator.classList.add('fade-out');
        // Opcional: eliminarlo del DOM después de la animación
        setTimeout(() => indicator.remove(), 400);
    }

    // Lógica de rotación que ya tenías
    if (clickedCard.classList.contains('active')) {
        container.appendChild(clickedCard);
    } else {
        container.prepend(clickedCard);
    }
    
    const cards = Array.from(container.querySelectorAll('.stack-card'));
    cards.forEach(card => card.classList.remove('active'));
    container.querySelector('.stack-card').classList.add('active');
}



document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});



const faqObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });
