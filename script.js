// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navMenu) navMenu.classList.remove('active');
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animation for Cards with Staggered Effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered animation delay
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
const cardsToObserve = document.querySelectorAll('.project-card, .contact-card, .highlight-item, .skill-category');
cardsToObserve.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    const scrollPosition = window.pageYOffset;
    
    document.querySelectorAll('.hero').forEach(hero => {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// Mouse Move Gradient Effect
document.addEventListener('mousemove', (e) => {
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            btn.style.setProperty('--mouse-x', x + 'px');
            btn.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// Add ripple effect on button click
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Count up animation for statistics
function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
    }, 16);
}

// Trigger count-up when in view
const highlightNumbers = document.querySelectorAll('.highlight-number');
let hasTriggered = false;

const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered) {
            highlightNumbers.forEach(number => {
                const text = number.textContent;
                const target = parseInt(text);
                countUp(number, target);
            });
            hasTriggered = true;
        }
    });
}, { threshold: 0.5 });

if (highlightNumbers[0]) {
    highlightObserver.observe(highlightNumbers[0].closest('.highlight-item'));
}

// Smooth reveal animation on scroll
const revealElements = document.querySelectorAll('h2, h3, p, ul, .section-title');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Add scroll progress indicator (optional enhancement)
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    
    // You can use this value to update a progress bar or other element
    // For example: document.querySelector('.scroll-progress').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Console message with styling
console.log('%c🚀 Kamran Abro - Professional Portfolio', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c📧 Email: kabro300200@gmail.com', 'color: #ec4899; font-size: 14px;');
console.log('%c📱 Phone: +92 335 7300200', 'color: #f59e0b; font-size: 14px;');
console.log('%c✨ Website Built with Modern Animations & Effects', 'color: #10b981; font-size: 14px; font-style: italic;');

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Preload images and resources
window.addEventListener('load', () => {
    console.log('%c✅ All resources loaded successfully!', 'color: #10b981; font-size: 12px;');
});
