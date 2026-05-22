const introLoader = document.getElementById('intro-loader');
const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (introLoader) {
    window.addEventListener('load', () => {
        const doorDelay = prefersReducedMotion ? 250 : 2200;
        const hideDelay = prefersReducedMotion ? 350 : 3100;
        const removeDelay = prefersReducedMotion ? 0 : 800;

        window.setTimeout(() => {
            introLoader.classList.add('doors-open');
        }, doorDelay);

        window.setTimeout(() => {
            introLoader.classList.add('intro-hide');
            document.body.classList.remove('intro-active');

            window.setTimeout(() => {
                introLoader.setAttribute('aria-hidden', 'true');
                introLoader.style.display = 'none';
            }, removeDelay);
        }, hideDelay);
    });
}

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

const setActivePage = () => {
    const currentPage = document.body.dataset.page || 'home';

    navLinks.forEach((link) => {
        const isActive = link.dataset.page === currentPage;
        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
};

if (header && navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

setActivePage();

const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('reveal-visible'));
}
