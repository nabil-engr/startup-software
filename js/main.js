document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile menu toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Close mobile menu on link click
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // 2. Header background change on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-surface/95', 'shadow-md');
                header.classList.remove('bg-surface/80');
            } else {
                header.classList.add('bg-surface/80');
                header.classList.remove('bg-surface/95', 'shadow-md');
            }
        });
    }

    // 3. Scroll-triggered animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 4. Active nav highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('bg-surface-container-high', 'text-on-surface');
                    link.classList.add('text-on-surface-variant');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('bg-surface-container-high', 'text-on-surface');
                        link.classList.remove('text-on-surface-variant');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // 5. Contact form handling
    const contactForm = document.querySelector('form');
    const contactStatus = document.getElementById('contact-status');
    if (contactForm && contactStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactStatus.classList.remove('hidden');
        });
    }
});
