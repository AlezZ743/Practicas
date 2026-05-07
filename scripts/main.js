document.addEventListener('DOMContentLoaded', () => {
    initHeroBlob();
    initTabs();
    initFAQ();
    initNewsSlider();
});


/*----------------------------------------------------------------------------Blob del Text Hero----------------------------------------------------------------------------*/


function initHeroBlob() {
    const hero = document.querySelector('.hero');
    const blob = document.getElementById("blob");

    if (!hero || !blob) return;

    hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        blob.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { 
            duration: 1200, 
            fill: "forwards" 
        });
    });
}


/*----------------------------------------------------------------------------Pestañas---------------------------------------------------------------------------- */


function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.content');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            const id = btn.dataset.id;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            contents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(id);
            if (targetContent) targetContent.classList.add('active');
        });
    });
}


/*----------------------------------------------------------------------------Cartas-----------------------------------------------------------------------------*/


function rotateCards(clickedCard) {
    const container = clickedCard.parentElement;

    const indicator = clickedCard.querySelector('.click-indicator');
    if (indicator) {
        indicator.classList.add('fade-out');
        setTimeout(() => indicator.remove(), 400);
    }

    if (clickedCard.classList.contains('active')) {
        container.appendChild(clickedCard);
    } else {
        container.prepend(clickedCard);
    }
    
    const cards = Array.from(container.querySelectorAll('.stack-card'));
    cards.forEach(card => card.classList.remove('active'));
    container.querySelector('.stack-card').classList.add('active');
}


/*----------------------------------------------------------------------------FAQ-----------------------------------------------------------------------------*/


function initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
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
          entry.target.classList.add('reveal-visible'); 
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.faq-section, .faq-item').forEach(el => faqObserver.observe(el));
}


/*----------------------------------------------------------------------------Noticias-----------------------------------------------------------------------------*/


function initNewsSlider() {
    const track = document.querySelector('.news-track');
    const cards = document.querySelectorAll('.news-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('dots');

    if (!track || !cards.length) return;

    let index = 0;
    let autoPlayInterval;

    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        if(dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        index = (index + 1) % cards.length;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + cards.length) % cards.length;
        updateSlider();
    }

    function goToSlide(n) {
        index = n;
        updateSlider();
        resetInterval();
    }

    function startInterval() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(autoPlayInterval);
        startInterval();
    }

    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', startInterval);

    startInterval();
}
