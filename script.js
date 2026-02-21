// Set album cover image path
// Try to load from media folder first, then fallback
window.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.album-cover');
    if (img) {
        // Try relative path first (when media folder exists)
        img.src = 'media/cover.jpg';
        img.onerror = function () {
            // Fallback: try file:// absolute path
            this.src = 'file:///Users/kawamatakiyoshi1/.gemini/antigravity/brain/4f609614-eeae-4148-ba7f-2cab2b7079ed/media__1771209311457.jpg';
            this.onerror = null;
        };
    }
});

// Smooth scrolling for anchor links
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

// Intersection Observer for fade-in animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.tour-item, .album-details');
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
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to tour items
document.querySelectorAll('.tour-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.borderColor = 'var(--color-orange)';
    });

    item.addEventListener('mouseleave', function () {
        if (!this.classList.contains('oneman') && !this.classList.contains('tour-final')) {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
});

// Dynamic album cover loading
const albumCover = document.querySelector('.album-cover');
if (albumCover) {
    albumCover.addEventListener('load', () => {
        albumCover.style.opacity = '1';
    });
    albumCover.style.opacity = '0';
    albumCover.style.transition = 'opacity 0.6s ease';
}

// Add active state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Prevent default for demo purposes
        if (this.getAttribute('href') === '#') {
            e.preventDefault();

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';

            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
