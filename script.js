// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Album Cover Image Loading
    const img = document.querySelector('.album-cover');
    if (img) {
        img.src = 'cover.jpg';
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.onload = () => { img.style.opacity = '1'; };
    }

    // 2. Hamburger Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('is-active');
            menuOverlay.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking outside (on the overlay)
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuToggle.classList.remove('is-active');
                menuOverlay.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            }
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                menuOverlay.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.tour-item, .album-details, .comment-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Ripple Effect for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            setTimeout(() => ripple.remove(), 600);
        }
    });
});
