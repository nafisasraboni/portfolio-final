const loadSectionIncludes = async () => {
    const includeElements = Array.from(document.querySelectorAll('[data-include]'));

    await Promise.all(includeElements.map(async (element) => {
        const filePath = element.getAttribute('data-include');
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Could not load ${filePath}`);
        }

        element.outerHTML = await response.text();
    }));
};

const initIntroLoader = () => {
    const introLoader = document.getElementById('intro-loader');
    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!introLoader) {
        return;
    }

    const startIntroExit = () => {
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
    };

    if (document.readyState === 'complete') {
        startIntroExit();
    } else {
        window.addEventListener('load', startIntroExit, { once: true });
    }
};

const initNavigation = () => {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.site-nav a');
    const navTargets = Array.from(navLinks)
        .map((link) => {
            const href = link.getAttribute('href');
            return href && href.startsWith('#') ? document.querySelector(href) : null;
        })
        .filter(Boolean);

    const setActiveLink = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
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
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    setActiveLink(href.replace('#', ''));
                }

                header.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if ('IntersectionObserver' in window && navTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-42% 0px -48% 0px'
        });

        navTargets.forEach((section) => observer.observe(section));
        setActiveLink(navTargets[0].id);
    } else if (navTargets.length) {
        setActiveLink(navTargets[0].id);
    }
};

const initRevealAnimations = () => {
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
};

const initCertificationFlipCards = () => {
    const flipCards = document.querySelectorAll('.certification-flip-card');

    flipCards.forEach((card) => {
        const toggleCard = () => {
            const isFlipped = card.classList.toggle('is-flipped');
            card.setAttribute('aria-pressed', String(isFlipped));
        };

        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                return;
            }

            toggleCard();
        });

        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            event.preventDefault();
            toggleCard();
        });
    });
};

const initPortfolio = () => {
    initIntroLoader();
    initNavigation();
    initRevealAnimations();
    initCertificationFlipCards();
};

const bootPortfolio = async () => {
    try {
        await loadSectionIncludes();
    } catch (error) {
        console.error('Section loading failed:', error);
    }

    initPortfolio();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPortfolio, { once: true });
} else {
    bootPortfolio();
}
