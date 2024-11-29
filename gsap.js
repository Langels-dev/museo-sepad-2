function revealText(e) {
    const heroText = document.querySelector('.hero-content .hero-title')
    if (!heroText) {
        return;
    } else {
        const text = heroText.textContent;
        heroText.innerHTML = text.split('').map(char => `<span class="letter">${char === ' ' ? '&nbsp;' : char}</span>`).join('')

        // Animación GSAP
        gsap.fromTo('.hero-title .letter',
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.5,
                stagger: 0.03,
                ease: 'power2.out'
            }
        );
    }
}

function pageTransition() {
    const ease = "power4.InOut";
    
    revealTransition().then(() => {
        gsap.set(".block", { visibility: "hidden" });
    })

    function revealTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { scaleY: 1 })
            gsap.to(".block", {
                scaleY: 0,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: "auto",
                    axis: "x"
                },
                ease: ease,
                onComplete: resolve,
            })
        })
    }

    function animateTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { visibility: "visible", scaleY: 0 });
            gsap.to(".block", {
                scaleY: 1,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: [2, 5],
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            })
        })
    }
}

function triggerAnimation() {
    // Selecciona todos los elementos con la clase reveal-section
    const revealSections = document.querySelectorAll('.line-content');
    if (revealSections.length === 0) {
        return;
    } else {
        // Registra ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        revealSections.forEach((section) => {
            // Animación para la sección completa
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%', // Cuando el top de la sección llega al 80% de la ventana
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Animación para los textos dentro de la sección
            const revealTexts = section.querySelectorAll('.line-content p');

            revealTexts.forEach((text, index) => {
                gsap.to(text, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: index * 0.2, // Añade un pequeño delay entre elementos
                    ease: 'power2.out'
                });
            });
        });
    }
}

function playVideo() {
    const video = document.querySelector('video')
    const btnVideo = document.querySelector('.btn-play')

    if (video === null && btnVideo === null) {
        return;
    } else {
        btnVideo.addEventListener('click', (e) => {
            if (video.paused) {
                video.play()
            } else {
                video.pause()
            }
        })
    }
}

function navigatePage(direction,e) {
    const pages = [
        "",
        "pages/intro.html",
        "pages/pascua.html",
        "pages/panesinlevadura.html",
        "pages/primicias.html",
        "pages/pentecostes.html",
        "pages/trompetas.html",
        "pages/expiacion.html",
        "pages/tabernaculos.html",
        "pages/conclusion.html"
    ]

    // Obtener la ruta actual, eliminando la barra inicial si existe
    const currentPath = window.location.pathname.replace(/^\//, '');
    // Encontrar el índice de la página actual
    const currentIndex = pages.findIndex(page => 
        // Comparar con página vacía para la página de inicio
        (currentPath === '' && page === '') || 
        currentPath === page
    );

    let newIndex;
    if (direction === 'next') {
        newIndex = currentIndex + 1;
    } else {
        newIndex = currentIndex - 1;
    }

    // Si es la primera página (índice 0), navegar a la raíz
    const newPage = pages[newIndex] || '';
        
    // Construir la URL
    const newUrl = newPage ? '/' + newPage : '/';

    console.log(currentPath);
    console.log(newPage, newUrl);

    //window.location.href = newUrl
}

window.addEventListener('load', revealText)
document.addEventListener('DOMContentLoaded', () => {
    playVideo();
    pageTransition();
    triggerAnimation();
})
